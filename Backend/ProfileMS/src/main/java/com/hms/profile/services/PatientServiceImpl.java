package com.hms.profile.services;


import com.hms.profile.dto.PatientDTO;
import com.hms.profile.exceptions.HmsException;
import com.hms.profile.models.Patient;
import com.hms.profile.repository.DoctorRepository;
import com.hms.profile.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PatientServiceImpl implements PatientService{

    @Autowired
    private PatientRepository patientRepository;


    @Override
    public Long addPatient (PatientDTO patientDTO) throws HmsException {
            if(patientDTO.getEmail() != null && patientRepository.findPatientByEmail(patientDTO.getEmail()).isPresent()){
                throw new HmsException("PATIENT_ALREADY_EXISTS");
            }
            if(patientDTO.getAadharNumber() != null && patientRepository.findPatientByAadharNumber(patientDTO.getAadharNumber()).isPresent()){
                throw new HmsException("PATIENT_ALREADY_EXISTS");
            }
            return patientRepository.save(patientDTO.toEntity()).getId();
    }

    @Override
    public PatientDTO getPatientById(Long patientId) throws HmsException {
        return patientRepository.findById(patientId).orElseThrow(()->new HmsException("PATIENT_NOT_FOUND")).toDTO();
    }

    @Override
    public PatientDTO updatePatient(PatientDTO patientDTO) throws HmsException {
        patientRepository.findById(patientDTO.getId()).orElseThrow(()->new HmsException("PATIENT_NOT_FOUND"));
        return patientRepository.save(patientDTO.toEntity()).toDTO();
    }
}
