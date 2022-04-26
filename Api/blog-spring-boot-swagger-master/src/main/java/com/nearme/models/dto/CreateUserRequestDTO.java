package com.nearme.models.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Schema
@AllArgsConstructor
@NoArgsConstructor
public class CreateUserRequestDTO {
    @NotNull
    @NotEmpty
    @Email
    @Size(min = 5, max = 300, message = "Email must have min 1 max 200 characters")
    @Schema(example = "correo@gmail..com", description = "User´s email which will be used as login")
    String email;
       
    @Size(max = 100, message = "Name has max 100 characters")
    @Schema(example = "Max", description = "Name of user")
    String name;  

    @Size(max = 100, message = "Surname has max 100 characters")
    @Schema(example = "Matorral", description = "Surname of user")
    String surname;

      String password;
}
