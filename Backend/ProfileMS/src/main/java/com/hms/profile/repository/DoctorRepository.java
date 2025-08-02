package com.hms.profile.repository;

import com.hms.profile.models.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.validation.annotation.Validated;

import java.util.Optional;

public interface DoctorRepository extends JpaRepository<Doctor,Long> {
    Optional<Doctor> findDoctorByEmail(@Validated String email);
    Optional<Doctor> findDoctorByLicenseNumber(@Validated String licenseNumber);
}
