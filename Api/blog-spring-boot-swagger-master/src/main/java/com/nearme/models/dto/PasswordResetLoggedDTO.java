package com.nearme.models.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class PasswordResetLoggedDTO {
	@NotBlank(message = "Password is required")
	@Size(min = 8, message = "Password should have min 8 characters")
	String password;	
	@NotBlank(message = "Old password is required")
	String oldPassword;
}

