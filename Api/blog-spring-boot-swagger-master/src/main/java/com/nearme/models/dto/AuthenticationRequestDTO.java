package com.nearme.models.dto;

import lombok.*;

import javax.validation.constraints.NotNull;

import io.swagger.v3.oas.annotations.media.Schema;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthenticationRequestDTO {
	@NotNull
	@Schema(example = "testuser")
	private String username;
	@NotNull
	@Schema(example = "12345")
	private String password;
}