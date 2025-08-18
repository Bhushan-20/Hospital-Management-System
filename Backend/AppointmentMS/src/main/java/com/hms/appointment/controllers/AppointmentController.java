package com.hms.appointment.controllers;


import com.hms.appointment.dto.AppointmentDTO;
import com.hms.appointment.dto.AppointmentDetails;
import com.hms.appointment.exceptions.HmsException;
import com.hms.appointment.models.Appointment;
import com.hms.appointment.services.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Validated
@RequestMapping("/api/v1/appointment")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @PostMapping("/schedule")
    public ResponseEntity<Long> scheduleAppointment(@Validated @RequestBody AppointmentDTO appointmentDTO) throws HmsException {
        return new ResponseEntity<>(appointmentService.scheduleAppointment(appointmentDTO), HttpStatus.CREATED);
    }

    @PutMapping("/cancel/{appointmentId}")
    public ResponseEntity<String> cancelAppointment(@PathVariable Long appointmentId) throws HmsException {
        appointmentService.cancelAppointmentById(appointmentId);
        return new ResponseEntity<>("Appointment Cancelled",HttpStatus.OK);
    }

    @GetMapping("/get/{appointmentId}")
    public ResponseEntity<AppointmentDTO> getAppointmentById(@PathVariable Long appointmentId) throws HmsException {
        return new ResponseEntity<>(appointmentService.getAppointmentDetailsById(appointmentId),HttpStatus.OK);
    }

    @GetMapping("/get/details/{appointmentId}")
    public ResponseEntity<AppointmentDTO> getAppointmentDetails(@PathVariable Long appointmentId) throws HmsException {
        return new ResponseEntity<>(appointmentService.getAppointmentDetailsById(appointmentId),HttpStatus.OK);
    }

    @GetMapping("/getAllAppointments/{patientId}")
    public ResponseEntity<List<AppointmentDetails>> getAllAppointments(@PathVariable Long patientId) throws HmsException {
        return new ResponseEntity<>(appointmentService.getAllAppointmentDetailsByPatientId(patientId),HttpStatus.OK);
    }

    @GetMapping("/doctors/getAllAppointments/{doctorId}")
    public ResponseEntity<List<AppointmentDetails>> getAllAppointmentsByDoctorId(@PathVariable Long doctorId) throws HmsException {
        return new ResponseEntity<>(appointmentService.getAllAppointmentDetailsByDoctorId(doctorId),HttpStatus.OK);
    }
}
