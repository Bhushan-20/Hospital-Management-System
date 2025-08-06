package com.hms.appointment.dto;

import com.hms.appointment.enums.AppointmentMode;
import com.hms.appointment.enums.AppointmentStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AppointmentDetails {
    private Long id;
    private Long patientId;
    private String patientName;
    private String patientEmail;
    private String patientPhone;
    private Long doctorId;
    private String doctorName;
    private LocalDateTime appointmentTime;
    private AppointmentStatus status;
    private AppointmentMode mode;
    private String reason;
    private String notes;


    public AppointmentDetails(Long id, Long patientId, String name, Long doctorId, String name1, LocalDateTime appointmentTime, String reason, AppointmentStatus status, String notes) {
    }
}
