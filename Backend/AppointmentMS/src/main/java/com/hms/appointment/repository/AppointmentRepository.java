package com.hms.appointment.repository;

import com.hms.appointment.models.Appointment;
import org.springframework.data.repository.CrudRepository;

public interface AppointmentRepository extends CrudRepository<Appointment,Long> {

}
