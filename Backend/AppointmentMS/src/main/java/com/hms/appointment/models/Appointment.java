package com.hms.appointment.models;

import com.hms.appointment.dto.AppointmentDTO;
import com.hms.appointment.enums.AppointmentMode;
import com.hms.appointment.enums.AppointmentStatus;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data

public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long patientId;
    private Long doctorId;
    private LocalDateTime appointmentTime;
    private AppointmentStatus status;
    private AppointmentMode mode;
    private String reason;
    private String notes;

    public AppointmentDTO toDTO() {
        return new AppointmentDTO(this.id, this.patientId, this.doctorId, this.appointmentTime, this.status, this.mode, this.reason, this.notes);
    }

}
