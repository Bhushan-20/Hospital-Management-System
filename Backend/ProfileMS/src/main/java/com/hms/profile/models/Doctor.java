package com.hms.profile.models;

import com.hms.profile.dto.DoctorDTO;
import com.hms.profile.dto.PatientDTO;
import com.hms.profile.enums.BloodGroup;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @Column(unique = true)
    private String email;
    private LocalDate birthDate;
    private String gender;
    private String phoneNumber;
    private String address;
    @Column(unique = true)
    private String licenseNumber;
    private String specialization;
    private String department;
    private Integer experience;

    public DoctorDTO toDTO() {
        return new DoctorDTO(this.id, this.name, this.email,this.birthDate, this.gender, this.phoneNumber, this.address, this.licenseNumber, this.specialization, this.department, this.experience);
    }
}
