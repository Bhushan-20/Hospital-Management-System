package com.hms.profile.dto;

import com.hms.profile.models.Doctor;
import com.hms.profile.models.Patient;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DoctorDTO {
    private Long id;
    private String name;
    private String email;
    private LocalDate birthDate;
    private String gender;
    private String phoneNumber;
    private String address;
    private String licenseNumber;
    private String specialization;
    private String department;
    private Integer experience;

    public Doctor toEntity() {
        return new Doctor(this.id, this.name, this.email,this.birthDate, this.gender, this.phoneNumber, this.address, this.licenseNumber, this.specialization, this.department, this.experience);
    }
}
