package com.hms.profile.controllers;


import com.hms.profile.dto.PatientDTO;
import com.hms.profile.exceptions.HmsException;
import com.hms.profile.services.PatientService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@Validated
@RequestMapping("/api/v1/profile/patient")
public class PatientController {

        @Autowired
        private PatientService patientService;

        @PostMapping("/add")
        public ResponseEntity<Long> addPatient(@Valid @RequestBody PatientDTO patientDTO) throws HmsException {
            return new ResponseEntity<>(patientService.addPatient(patientDTO), HttpStatus.CREATED);
        }

        @GetMapping("/getPatient/{id}")
        public ResponseEntity<PatientDTO> getPatientById(@PathVariable(value = "id") Long patientId) throws HmsException {
            return new ResponseEntity<>(patientService.getPatientById(patientId), HttpStatus.OK);
        }

        @PutMapping("/update")
        public ResponseEntity<PatientDTO> updatePatient(@Valid @RequestBody PatientDTO patientDTO) throws HmsException {
            return new ResponseEntity<>(patientService.updatePatient(patientDTO), HttpStatus.OK);
        }

}
