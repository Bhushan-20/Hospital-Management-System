package com.hms.profile.services;

import com.hms.profile.dto.PatientDTO;
import com.hms.profile.exceptions.HmsException;

public interface PatientService {

    public Long addPatient(PatientDTO patientDTO) throws HmsException;
    public PatientDTO getPatientById(Long patientId) throws HmsException;
    public PatientDTO updatePatient(PatientDTO patientDTO) throws HmsException;
    public Boolean patientExistorNot(Long id) throws HmsException;
}
