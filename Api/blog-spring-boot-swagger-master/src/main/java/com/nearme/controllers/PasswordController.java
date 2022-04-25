package com.nearme.controllers;

import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import com.nearme.models.dto.PasswordResetDTO;
import com.nearme.models.dto.PasswordResetLoggedDTO;
import com.nearme.models.dto.UserDTO;
import com.nearme.services.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@Validated
@RestController
@RequestMapping("/api/password")
public class PasswordController {
    @Autowired
    private UserService userService;

    /**
     * reset password
     * 
     * @param createUserRequestDTO
     * @return
     * @throws Exception
     */
    @PostMapping("/reset-password")
    @ResponseStatus(HttpStatus.OK)
    @Operation(security = @SecurityRequirement(name = "JwtToken"))
    public ResponseEntity<Void> resetPassword(@Valid @RequestBody PasswordResetDTO passwordResetDTO) throws Exception {
        if (userService.resetPassword(passwordResetDTO.getToken(), passwordResetDTO.getPassword())) {
            return new ResponseEntity<Void>(HttpStatus.OK);
        } else {
            return new ResponseEntity<Void>(HttpStatus.UNAUTHORIZED);
        }
    }

    /**
     * Resets the password of the logged user
     * 
     * @param passwordResetDTO
     * @param idUser
     * @return
     * @throws Exception
     */
    @PostMapping("/reset-password-logged/{idUser}")
    @ResponseStatus(HttpStatus.OK)
    @Operation(security = @SecurityRequirement(name = "JwtToken"))
    public ResponseEntity<Void> resetLoggedPassword(@Valid @RequestBody PasswordResetLoggedDTO passwordResetDTO,
            @PathVariable Integer idUser) throws Exception {
        UserDTO userDTO = userService.getUser(idUser);
        if (userService.resetLoggedPassword(userDTO, passwordResetDTO.getPassword(),
                passwordResetDTO.getOldPassword())) {
            return new ResponseEntity<Void>(HttpStatus.OK);
        } else {
            return new ResponseEntity<Void>(HttpStatus.FORBIDDEN);
        }
    }

    // PSW SENDER REQUEST

    /**
     * Validates password token
     * 
     * @param createUserRequestDTO
     * @return
     * @throws Exception
     */
    @GetMapping("/validate-token/{token}")
    @ResponseStatus(HttpStatus.OK)
    @Operation(security = @SecurityRequirement(name = "JwtToken"))
    public ResponseEntity<Void> validateToken(@PathVariable("token") String token) throws Exception {
        if (userService.validateToken(token)) {
            return new ResponseEntity<Void>(HttpStatus.OK);
        } else {
            return new ResponseEntity<Void>(HttpStatus.UNAUTHORIZED);
        }
    }
}