package com.hms.appointment.services;

import com.hms.appointment.dto.AppointmentDTO;
import com.hms.appointment.dto.AppointmentDetails;
import com.hms.appointment.exceptions.HmsException;
import com.hms.appointment.models.Appointment;


public interface AppointmentService {

    Long scheduleAppointment(AppointmentDTO appointment) throws HmsException;
    void cancelAppointmentById(Long appointmentId) throws HmsException;
    void completeAppointmentById(Long appointmentId);
    void rescheduleAppointmentById(Long appointmentId, String newDateTime);
    AppointmentDTO getAppointmentDetailsById(Long appointmentId) throws HmsException;
    AppointmentDetails getAppointmentDetailsWithName(Long appointmentId) throws HmsException;
}
