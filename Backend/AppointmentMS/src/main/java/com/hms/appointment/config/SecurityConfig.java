package com.hms.appointment.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//        http
//                .csrf().disable()
//                .authorizeHttpRequests(auth -> auth
//                        .anyRequest().permitAll() // ✅ Allow everything temporarily
//                )
//                .formLogin().disable()
//                .httpBasic().disable();
//        return http.build();

        http
                .csrf().disable()
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(request -> "SECRET".equals(request.getHeader("X-Secret-Key"))).permitAll()
                        .anyRequest().denyAll()
                );

        return http.build();
    }

}
