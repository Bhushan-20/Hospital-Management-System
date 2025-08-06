package com.hms.profile.services;

import com.hms.profile.dto.DoctorDTO;
import com.hms.profile.exceptions.HmsException;

public interface DoctorService {

    public Long  addDoctor(DoctorDTO doctor) throws HmsException;
    public DoctorDTO getDoctorById(Long doctorId) throws HmsException;
    public DoctorDTO updateDoctor(DoctorDTO doctorDTO) throws HmsException;
    public Boolean doctorExistorNot(Long id) throws HmsException;
}
