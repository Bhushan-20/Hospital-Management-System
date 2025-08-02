package com.hms.profile.dto;

import com.hms.profile.enums.BloodGroup;
import com.hms.profile.models.Patient;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PatientDTO {
    private Long id;
    private String name;
    private String email;
    private LocalDate birthDate;
    private String gender;
    private String phoneNumber;
    private String address;
    private String aadharNumber;
    private BloodGroup bloodGroup;
    private List<String> allergies;
    private String chronicDisease;

    public Patient toEntity() {
        return new Patient(this.id, this.name, this.email,this.birthDate, this.gender, this.phoneNumber, this.address, this.aadharNumber, this.bloodGroup, this.allergies, this.chronicDisease);
    }
}
