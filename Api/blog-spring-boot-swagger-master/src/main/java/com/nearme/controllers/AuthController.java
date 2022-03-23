package com.nearme.controllers;

import com.nearme.services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    @Autowired
	private UserService userService;

/**
	 * Authenticate userEntity in system
	 * 
	 * @param data
	 * @return
	 */
	@PostMapping("/singin")
	public ResponseEntity<Boolean> signin(@RequestBody String data) {
        log.info("Loging In!");
		return new ResponseEntity<>(true, HttpStatus.OK);
		
	}
    // @PostMapping("/signin")
	// public ResponseEntity<?> signin(@RequestBody AuthenticationRequestDTO data) {
	// 	try {
	// 		return new ResponseEntity<Map<String, String>>(this.authService.authenticate(data), HttpStatus.OK);
	// 	} catch (Exception ex) {
	// 		return new ResponseEntity<ErrorDTO>(new ErrorDTO(ex.getMessage()), HttpStatus.BAD_REQUEST);
	// 	}
	// }
    
}
