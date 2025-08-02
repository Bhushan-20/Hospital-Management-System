package com.hms.user.services;


import com.hms.user.dto.UserDTO;
import com.hms.user.enums.UserRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class ApiService {
    @Autowired
    private WebClient.Builder webClientBuilder;

    public Mono<Long> addProfile(UserDTO userDTO) {
        if(userDTO.getRole().equals(UserRole.DOCTOR)){
            return webClientBuilder.build().post().uri("http://localhost:9100/api/v1/profile/doctor/add").bodyValue(userDTO).retrieve().bodyToMono(Long.class);
        }
        else if(userDTO.getRole().equals(UserRole.PATIENT)){
            return webClientBuilder.build().post().uri("http://localhost:9100/api/v1/profile/patient/add").bodyValue(userDTO).retrieve().bodyToMono(Long.class);
        }
        return null;
    }

}
