package com.hms.user.dto;


import com.hms.user.enums.UserRole;
import com.hms.user.models.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.*;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {

    private Long id;
    @NotBlank(message = "Name is Mandatory")
    private String name;
    @Column(unique = true)
    @NotBlank(message = "Email is Mandatory")
    @Email(message = "Email should be valid")
    private String email;
    @NotBlank(message = "Password is Mandatory")
    @Pattern(
            regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,15}$",
            message = "Password should be 8–15 characters long and contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character"
    )
    private String password;
    private UserRole role;

    public User toEntity() {
        return new User(this.id, this.name, this.email, this.password, this.role);
    }
}
