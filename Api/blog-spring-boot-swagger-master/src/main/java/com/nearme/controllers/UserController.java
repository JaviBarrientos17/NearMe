package com.nearme.controllers;

import java.util.List;

import com.nearme.models.dto.UserDTO;
import com.nearme.services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import lombok.extern.slf4j.Slf4j;

@Api(
   value = "Users Api Controller",
   description = "NearMe Users EndPoints"
)

@Slf4j
@RestController
@RequestMapping("/api/users")
public class UserController {

	@Autowired
	private UserService userService;



	// /**
	//  * Lists all existing users
	//  * 
	//  * @return
	//  * @throws Exception
	//  */
	// // @Operation(security = @SecurityRequirement(name = "JwtToken"))
	// @GetMapping("/list")
	// public ResponseEntity<List<UserDTO>> getUsersList() throws Exception {
	// 	log.info("Listing all users");
	// 	return new ResponseEntity<List<UserDTO>>(this.userService.getUsers(), HttpStatus.OK);
	// }
	









// 	/**
// 	 * Assigns a role to user
// 	 * 
// 	 * @param manageRoleDTO
// 	 * @throws UserServiceException
// 	 */
	
// 	@PostMapping("/assign-role")
// 	@ResponseStatus(HttpStatus.OK)
// 	public void assignRole(@RequestBody ManageRoleDTO manageRoleDTO) {
// 		this.userService.assignRole(manageRoleDTO);
// 	}
// }
}