package com.hms.appointment.services;

import com.hms.appointment.dto.DoctorDTO;
import com.hms.appointment.dto.PatientDTO;
import com.hms.appointment.exceptions.HmsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class ApiService {

    @Autowired
    private WebClient.Builder webClientBuilder;

    public Mono<Boolean> doctorProfileExistorNot(Long id) {
            return webClientBuilder.build().get().uri("http://localhost:9100/api/v1/profile/doctor/exists/" + id).retrieve().bodyToMono(Boolean.class);
    }

    public Mono<Boolean> patientProfileExistorNot(Long id) {
        return webClientBuilder.build().get().uri("http://localhost:9100/api/v1/profile/patient/exists/" + id).retrieve().bodyToMono(Boolean.class);
    }

    public Mono<DoctorDTO> getDoctorProfile(Long id) throws HmsException {
        return webClientBuilder.build().get().uri("http://localhost:9100/api/v1/profile/doctor/getDoctor/" + id).retrieve().bodyToMono(DoctorDTO.class);
    }

    public Mono<PatientDTO> getPatientProfile(Long id) throws HmsException {
        return webClientBuilder.build().get().uri("http://localhost:9100/api/v1/profile/patient/getPatient/" + id).retrieve().bodyToMono(PatientDTO.class);
    }
}
