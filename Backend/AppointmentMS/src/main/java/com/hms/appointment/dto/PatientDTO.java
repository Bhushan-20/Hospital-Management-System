package com.hms.appointment.dto;

import com.hms.appointment.enums.BloodGroup;
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
}
