package com.hms.appointment.dto;

import com.hms.appointment.enums.AppointmentMode;
import com.hms.appointment.enums.AppointmentStatus;
import com.hms.appointment.models.Appointment;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class AppointmentDTO {
    private Long id;
    private Long patientId;
    private Long doctorId;
    private LocalDateTime appointmentTime;
    private AppointmentStatus status;
    private AppointmentMode mode;
    private String reason;
    private String notes;

    public Appointment toEntity() {
        return new Appointment(this.id, this.patientId, this.doctorId, this.appointmentTime, status, mode, reason, notes);
    }
}
