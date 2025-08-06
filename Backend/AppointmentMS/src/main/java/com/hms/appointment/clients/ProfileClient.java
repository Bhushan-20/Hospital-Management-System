package com.hms.appointment.clients;

import com.hms.appointment.config.FeignClientInterceptor;
import com.hms.appointment.dto.DoctorDTO;
import com.hms.appointment.dto.PatientDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.cloud.openfeign.FeignClientProperties;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "PROFILEMS", configuration = FeignClientInterceptor.class)
public interface ProfileClient {

    @GetMapping("/api/v1/profile/doctor/exists/{id}")
    Boolean doctorProfileExistorNot(@PathVariable("id") Long id);

    @GetMapping("/api/v1/profile/patient/exists/{id}")
    Boolean patientProfileExistorNot(@PathVariable("id") Long id);

    @GetMapping("api/v1/profile/patient/getPatient/{id}")
    PatientDTO getPatientProfile(@PathVariable("id") Long id);

    @GetMapping("api/v1/profile/doctor/getDoctor/{id}")
    DoctorDTO getDoctorProfile(@PathVariable("id") Long id);

}
