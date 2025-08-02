package com.hms.appointment.services;

import com.hms.appointment.dto.AppointmentDTO;
import com.hms.appointment.enums.AppointmentStatus;
import com.hms.appointment.exceptions.HmsException;
import com.hms.appointment.models.Appointment;
import com.hms.appointment.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AppointmentServiceImpl implements AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Override
    public Long scheduleAppointment(AppointmentDTO appointmentDTO){
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


}
