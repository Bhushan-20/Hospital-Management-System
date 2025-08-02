package com.hms.user.models;

import com.hms.user.dto.UserDTO;
import com.hms.user.enums.UserRole;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @Column(unique = true)
    private String email;
    private String password;
    private UserRole role;
    private Long profileId;

    public UserDTO toDTO() {
        return new UserDTO(this.id, this.name, this.email, this.password, this.role,  this.profileId);
    }
}
