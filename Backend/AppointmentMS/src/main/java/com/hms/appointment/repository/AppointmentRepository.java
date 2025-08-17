package com.hms.appointment.repository;

import com.hms.appointment.dto.AppointmentDetails;
import com.hms.appointment.models.Appointment;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface AppointmentRepository extends CrudRepository<Appointment,Long> {

    @Query("SELECT new com.hms.appointment.dto.AppointmentDetails(a.id, a.patientId, null, null, null, a.doctorId, null, a.appointmentTime, a.status, a.mode, a.reason, a.notes) " +
            "FROM Appointment a WHERE a.patientId = ?1 ORDER BY a.id DESC")
    List<AppointmentDetails> findAllByPatientId(Long patientId);
}
