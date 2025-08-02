package com.hms.user.jwt;

import com.hms.user.dto.UserDTO;
import com.hms.user.exceptions.HmsException;
import com.hms.user.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UserService userService;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        try {
            UserDTO dto = userService.getUser(email);

            return new CustomUserDetails(
                    dto.getId(),
                    dto.getEmail(),
                    dto.getEmail(),
                    dto.getPassword(),
                    dto.getRole(),
                    dto.getName(),
                    dto.getProfileId(),
                    Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + dto.getRole().name()))
            );
        } catch (HmsException e) {
            throw new UsernameNotFoundException(e.getMessage());
        }
    }
}
