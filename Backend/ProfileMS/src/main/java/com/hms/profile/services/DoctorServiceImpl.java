package com.hms.profile.services;

import com.hms.profile.dto.DoctorDTO;
import com.hms.profile.dto.PatientDTO;
import com.hms.profile.exceptions.HmsException;
import com.hms.profile.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DoctorServiceImpl implements DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    @Override
    public Long addDoctor (DoctorDTO doctorDTO) throws HmsException {
        if(doctorDTO.getEmail() != null && doctorRepository.findDoctorByEmail(doctorDTO.getEmail()).isPresent()){
            throw new HmsException("DOCTOR_ALREADY_EXISTS");
        }
        if(doctorDTO.getLicenseNumber() != null && doctorRepository.findDoctorByLicenseNumber(doctorDTO.getLicenseNumber()).isPresent()){
            throw new HmsException("DOCTOR_ALREADY_EXISTS");
        }
        return doctorRepository.save(doctorDTO.toEntity()).getId();
    }

    @Override
    public DoctorDTO getDoctorById(Long doctorId) throws HmsException {
        return doctorRepository.findById(doctorId).orElseThrow(()->new HmsException("DOCTOR_NOT_FOUND")).toDTO();
    }

    @Override
    public DoctorDTO updateDoctor(DoctorDTO doctorDTO) throws HmsException {
        doctorRepository.findById(doctorDTO.getId()).orElseThrow(()->new HmsException("DOCTOR_NOT_FOUND"));
        return doctorRepository.save(doctorDTO.toEntity()).toDTO();
    }

    @Override
    public Boolean doctorExistorNot(Long doctorId) throws HmsException {
        return doctorRepository.findById(doctorId).isPresent();
    }
}
