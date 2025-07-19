package com.hms.user.jwt;

import com.hms.user.dto.UserDTO;
import com.hms.user.exceptions.HmsException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.validation.Valid;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtil {
    private static final Long JWT_TOKEN_EXPIRATION_TIME = 5*60*60L;
    private static final String SECRET = "9204930917a32235170e9974a77f6170ed85b4b0e89f3ad80b02061210027722823c6592b619e7aa9b93f5a95f73cada42d14d12c60e891a0f49e840332fc624";
    public String generateToken(UserDetails userDetails) throws HmsException {
        Map<String, Object> claims = new HashMap<>();
        CustomUserDetails customUserDetails = (CustomUserDetails) userDetails;
        claims.put("id", customUserDetails.getId());
        claims.put("name", customUserDetails.getName());
        claims.put("email", customUserDetails.getEmail());
        claims.put("role", customUserDetails.getRole());
        return doGenerateToken(claims, customUserDetails.getUsername());
    }

    public String doGenerateToken(Map<String, Object> claims, String subject) {
        return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis())).setExpiration(new Date(System.currentTimeMillis()+JWT_TOKEN_EXPIRATION_TIME*1000)).signWith(SignatureAlgorithm.HS512, SECRET).compact();
    }
}
