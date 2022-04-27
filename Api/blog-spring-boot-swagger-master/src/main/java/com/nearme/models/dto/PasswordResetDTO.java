package com.nearme.models.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class PasswordResetDTO {
	@NotBlank(message = "Token is required")
	String token;
	@NotBlank(message = "Password is required")
	@Size(min = 8, message = "Password should have min 8 characters")
	String password;
}

