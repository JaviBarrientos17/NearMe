package com.nearme.controllers;


import java.util.List;
import com.nearme.models.dto.CreateUserRequestDTO;
import com.nearme.models.dto.ManageRoleDTO;
import com.nearme.models.dto.UserDTO;
import com.nearme.services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;


import lombok.extern.slf4j.Slf4j;


@Slf4j
@RestController
@RequestMapping("/api/users")
public class UserController {

	@Autowired
	private UserService userService;



	/**
	 * Adds a new user
	 * @param UserDTO
	 * @return response
	 * @throws Exception
	 */
	@PostMapping("/add-user")
    @ResponseStatus(HttpStatus.OK)
	// @Operation(security = @SecurityRequirement(name = "JwtToken"))
    public ResponseEntity<UserDTO> createUser(@RequestBody CreateUserRequestDTO createUserRequestDTO) throws Exception {
        return new ResponseEntity<UserDTO>(this.userService.createUser(createUserRequestDTO), HttpStatus.OK);
	}

	/**
	 * Lists all existing users
	 * 
	 * @return
	 * @throws Exception
	 */
	// // @Operation(security = @SecurityRequirement(name = "JwtToken"))
	@GetMapping("/list")
	public ResponseEntity<List<UserDTO>> getUsersList() throws Exception {
		log.info("Listing all users");
		return new ResponseEntity<List<UserDTO>>(this.userService.getUsers(), HttpStatus.OK);
	}
	



	/**
	 * Assigns a role to user
	 * 
	 * @param manageRoleDTO
	 * @throws UserServiceException
	 */
	
	@PostMapping("/assign-role")
	@ResponseStatus(HttpStatus.OK)
	// @Operation(security = @SecurityRequirement(name = "JwtToken"))
	public void assignRole(@RequestBody ManageRoleDTO manageRoleDTO) {
		this.userService.assignRole(manageRoleDTO);
	}
	
	/**
	 * Removes a role of a user
	 * 
	 * @param manageRoleDTO
	 */
	
	@PostMapping("/remove-role")
	@ResponseStatus(HttpStatus.OK)
	// @Operation(security = @SecurityRequirement(name = "JwtToken"))
	public void removeRole(@RequestBody ManageRoleDTO manageRoleDTO) {
		this.userService.removeRole(manageRoleDTO);
	}

	/**
	 * Block user
	 * 
	 * @throws Exception
	 */
	
	@PostMapping("/block-user")
	@ResponseStatus(HttpStatus.OK)
	// @Operation(security = @SecurityRequirement(name = "JwtToken"))
	public void blockUser(@RequestBody Integer idUser) throws Exception {
		this.userService.blockUser(idUser);
	}

	/**
	 * Unblock user
	 * 
	 * @throws Exception
	 */
	
	@PostMapping("/unblock-user")
	@ResponseStatus(HttpStatus.OK)
	// @Operation(security = @SecurityRequirement(name = "JwtToken"))
	public void unblockUser(@RequestBody Integer idUser) throws Exception {
		this.userService.unblockUser(idUser);
	}


	/**
	 * Update a user
	 * @param createUserRequestDTO
	 * @return
	 * @throws Exception
	 */
	@PutMapping("/update-user")
    @ResponseStatus(HttpStatus.OK)
	// @Operation(security = @SecurityRequirement(name = "JwtToken"))
    public ResponseEntity<?> updateUser(@RequestBody CreateUserRequestDTO createUserRequestDTO) throws Exception {
        return new ResponseEntity<UserDTO>(userService.updateUser(createUserRequestDTO), HttpStatus.OK);
	}
}