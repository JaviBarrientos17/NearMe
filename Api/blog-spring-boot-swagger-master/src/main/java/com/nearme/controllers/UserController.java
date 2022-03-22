package com.nearme.controllers;

import java.util.List;

import com.nearme.services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;


   
@Slf4j
@RestController
@RequestMapping("/api/users")
public class UserController {

	@Autowired
	private UserService userService;


	/**
	 * Lists all existing users
	 * 
	 * @return
	 * @throws Exception
	 */
	@GetMapping("/list")
	public ResponseEntity<String> getUsersList() throws Exception {
		log.info("Listing all users");
		return new ResponseEntity<String>("TOMATOE", HttpStatus.OK);
	}
	// @Operation(security = @SecurityRequirement(name = "JwtToken"))
	// @GetMapping("/list")
	// public ResponseEntity<List<UserDTO>> getUsersList() throws Exception {
	// 	log.info("Listing all users");
	// 	return new ResponseEntity<List<UserDTO>>(this.userService.getUsers(), HttpStatus.OK);
	// }
	
}
