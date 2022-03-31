package com.nearme.controllers;


import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import com.nearme.models.dto.AuthenticationRequestDTO;
import com.nearme.models.dto.ErrorDTO;
import com.nearme.security.jwt.JwtTokenProvider;
import com.nearme.services.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.extern.slf4j.Slf4j;


@Slf4j
@RestController
@RequestMapping("/api/auth")
public class AuthController {
	@Autowired
	private AuthService authService;

	@Autowired
	private JwtTokenProvider jwtTokenProvider;

	/**
	 * Authenticate userEntity in system
	 * 
	 * @param data
	 * @return
	 */
	@PostMapping("/signin")
	public ResponseEntity<?> signin(@RequestBody AuthenticationRequestDTO data) {
		try {
			return new ResponseEntity<Map<String, String>>(this.authService.authenticate(data), HttpStatus.OK);
		} catch (Exception ex) {
			return new ResponseEntity<ErrorDTO>(new ErrorDTO(ex.getMessage()), HttpStatus.BAD_REQUEST);
		}
	}

	/**
	 * Logs out user
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@Operation(security = @SecurityRequirement(name = "JwtToken"))
	@GetMapping("/logout")
	@ResponseStatus(HttpStatus.OK)
	public ResponseEntity<Void> logout(HttpServletRequest request, HttpServletResponse response) {
		String token = jwtTokenProvider.resolveToken((HttpServletRequest) request);
		this.authService.addTokenToBlacklist(token);
		log.info("User " + authService.getLoggedUserUsername() + " logged out");
		return new ResponseEntity<>(HttpStatus.OK);
	}
}

