package com.nearme.models.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema

public class PasswordResetRequestDTO {
 
    @NotNull
    @NotEmpty
    @Email
    @Size(min = 5, max = 300, message = "Email must have min 1 max 200 characters")
    @Schema(example = "martino@nearme.com", description = "User´s email which will be used as login")
    String email;
}
