package com.hms.profile.repository;

import com.hms.profile.models.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.validation.annotation.Validated;

import java.util.Optional;

public interface PatientRepository extends JpaRepository<Patient,Long> {
    Optional<Patient> findPatientByEmail(@Validated String email);
    Optional<Patient> findPatientByAadharNumber(@Validated String aadharNumber);
}
