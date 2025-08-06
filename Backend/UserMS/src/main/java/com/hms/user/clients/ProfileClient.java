package com.hms.user.clients;


import com.hms.user.config.FeignClientInterceptor;
import com.hms.user.dto.UserDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.cloud.openfeign.FeignClientProperties;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "PROFILEMS", configuration = FeignClientInterceptor.class)
public interface ProfileClient {

    @PostMapping("api/v1/profile/doctor/add")
    Long addDoctor(@RequestBody UserDTO userDTO);

    @PostMapping("api/v1/profile/patient/add")
    Long addPatient(@RequestBody UserDTO userDTO);
}
