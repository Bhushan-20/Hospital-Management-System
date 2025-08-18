package com.hms.appointment.services;

import com.hms.appointment.clients.ProfileClient;
import com.hms.appointment.dto.AppointmentDTO;
import com.hms.appointment.dto.AppointmentDetails;
import com.hms.appointment.dto.DoctorDTO;
import com.hms.appointment.dto.PatientDTO;
import com.hms.appointment.enums.AppointmentStatus;
import com.hms.appointment.exceptions.HmsException;
import com.hms.appointment.models.Appointment;
import com.hms.appointment.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentServiceImpl implements AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private ApiService apiService;

    @Autowired
    private ProfileClient  profileClient;

    @Override
    public Long scheduleAppointment(AppointmentDTO appointmentDTO) throws HmsException{
        //Boolean doctorExists = apiService.doctorProfileExistorNot(appointmentDTO.getDoctorId()).block();
        Boolean doctorExists = profileClient.doctorProfileExistorNot(appointmentDTO.getDoctorId());
        if(!doctorExists || doctorExists == null){
            throw new HmsException("DOCTOR_NOT_FOUND");
        }
        //Boolean patientExists = apiService.patientProfileExistorNot(appointmentDTO.getPatientId()).block();
        Boolean patientExists = profileClient.patientProfileExistorNot(appointmentDTO.getPatientId());
        if(!patientExists || patientExists == null){
            throw new HmsException("PATIENT_NOT_FOUND");
        }
        appointmentDTO.setStatus(AppointmentStatus.SCHEDULED);
        return appointmentRepository.save(appointmentDTO.toEntity()).getId();
    }

    @Override
    public void cancelAppointmentById(Long appointmentId) throws HmsException {
        Appointment appointment = appointmentRepository.findById(appointmentId).orElseThrow(()->new HmsException("APPOINTMENT_NOT_FOUND"));
        if(appointment.getStatus().equals(AppointmentStatus.CANCELLED)){
            throw new HmsException("APPOINTMENT_ALREADY_CANCELLED");
        }
        appointment.setStatus(AppointmentStatus.CANCELLED);
        appointmentRepository.save(appointment);
    }

    @Override
    public void completeAppointmentById(Long appointmentId){
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public void rescheduleAppointmentById(Long appointmentId, String newDateTime){
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public AppointmentDTO getAppointmentDetailsById(Long appointmentId) throws HmsException {
        return appointmentRepository.findById(appointmentId).orElseThrow(()->new HmsException("APPOINTMENT_NOT_FOUND")).toDTO();
    }

    @Override
    public AppointmentDetails getAppointmentDetailsWithName(Long appointmentId) throws HmsException {
        AppointmentDTO appointmentDTO = appointmentRepository.findById(appointmentId).orElseThrow(()->new HmsException("APPOINTMENT_NOT_FOUND")).toDTO();
        //DoctorDTO doctorDTO = apiService.getDoctorProfile(appointmentDTO.getDoctorId()).block();
        DoctorDTO doctorDTO = profileClient.getDoctorProfile(appointmentDTO.getDoctorId());
        //PatientDTO patientDTO = apiService.getPatientProfile(appointmentDTO.getPatientId()).block();
        PatientDTO patientDTO = profileClient.getPatientProfile(appointmentDTO.getPatientId());
        return new AppointmentDetails(appointmentDTO.getId(),appointmentDTO.getPatientId(), patientDTO.getName(), patientDTO.getEmail(),patientDTO.getPhoneNumber() , appointmentDTO.getDoctorId(), doctorDTO.getName(), appointmentDTO.getAppointmentTime(), appointmentDTO.getStatus(), appointmentDTO.getMode() ,appointmentDTO.getReason(),  appointmentDTO.getNotes());
    }

    @Override
    public List<AppointmentDetails> getAllAppointmentDetailsByPatientId(Long patientId) throws HmsException {
        return appointmentRepository.findAllByPatientId(patientId).stream().map(appointment->{
            DoctorDTO doctorDTO = profileClient.getDoctorProfile(appointment.getDoctorId());
            appointment.setDoctorName(doctorDTO.getName());
            return appointment;
        }).toList();
    }

    @Override
    public List<AppointmentDetails> getAllAppointmentDetailsByDoctorId(Long doctorId) throws HmsException {
        return appointmentRepository.findAllByDoctorId(doctorId).stream().map(appointment->{
            PatientDTO patientDTO = profileClient.getPatientProfile(appointment.getPatientId());
            appointment.setPatientName(patientDTO.getName());
            appointment.setPatientPhone(patientDTO.getPhoneNumber());
            appointment.setPatientEmail(patientDTO.getEmail());
            return appointment;
        }).toList();
    }
}
