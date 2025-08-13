package com.hms.profile.controllers;


import com.hms.profile.dto.DoctorDTO;
import com.hms.profile.dto.DoctorDropdown;
import com.hms.profile.dto.PatientDTO;
import com.hms.profile.exceptions.HmsException;
import com.hms.profile.services.DoctorService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/profile/doctor")
@Validated
public class DoctorController {

    @Autowired
    private DoctorService doctorService;


    @PostMapping("/add")
    public ResponseEntity<Long> addDoctor(@Valid @RequestBody DoctorDTO doctorDTO) throws HmsException {
        return new ResponseEntity<>(doctorService.addDoctor(doctorDTO), HttpStatus.CREATED);
    }

    @GetMapping("/getDoctor/{id}")
    public ResponseEntity<DoctorDTO> getDoctorById(@PathVariable(value = "id") Long doctorId) throws HmsException {
        return new ResponseEntity<>(doctorService.getDoctorById(doctorId), HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<DoctorDTO> updateDoctor(@Valid @RequestBody DoctorDTO doctorDTO) throws HmsException {
        return new ResponseEntity<>(doctorService.updateDoctor(doctorDTO), HttpStatus.OK);
    }

    @GetMapping("/exists/{id}")
    public ResponseEntity<Boolean> existDoctor(@PathVariable (value = "id") Long doctorId) throws HmsException {
        return new ResponseEntity<>(doctorService.doctorExistorNot(doctorId), HttpStatus.OK);
    }

    @GetMapping("/alldoctors")
    public ResponseEntity<List<DoctorDropdown>> getAllDoctors() throws HmsException {
        return new ResponseEntity<>( doctorService.getDoctorDropdown(), HttpStatus.OK);
    }
}
