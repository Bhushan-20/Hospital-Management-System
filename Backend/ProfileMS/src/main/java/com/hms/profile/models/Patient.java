package com.hms.profile.models;

import com.hms.profile.dto.PatientDTO;
import com.hms.profile.enums.BloodGroup;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Patient {
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
    private String aadharNumber;
    private BloodGroup bloodGroup;
    private List<String> allergies;
    private String chronicDisease;

    public PatientDTO toDTO() {
        return new PatientDTO(this.id, this.name, this.email,this.birthDate, this.gender, this.phoneNumber, this.address, this.aadharNumber, this.bloodGroup, this.allergies, this.chronicDisease);
    }
}
