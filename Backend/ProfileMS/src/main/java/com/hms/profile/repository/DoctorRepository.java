package com.hms.profile.repository;

import com.hms.profile.dto.DoctorDropdown;
import com.hms.profile.models.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.validation.annotation.Validated;

import java.util.List;
import java.util.Optional;

public interface DoctorRepository extends JpaRepository<Doctor,Long> {
    Optional<Doctor> findDoctorByEmail(@Validated String email);
    Optional<Doctor> findDoctorByLicenseNumber(@Validated String licenseNumber);

    @Query("SELECT d.id AS id, d.name AS name, d.specialization AS specialization FROM Doctor d")
    List<DoctorDropdown> findAllDoctorDropdown();
}
