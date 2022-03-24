package com.nearme.services;

import java.util.HashMap;
import java.util.Map;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.event.EventListener;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.event.AuthenticationFailureBadCredentialsEvent;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.nearme.models.dto.AuthenticationRequestDTO;
import com.nearme.models.entities.JwtBlacklistEntity;
import com.nearme.models.entities.UserEntity;
import com.nearme.models.types.ActionType;
import com.nearme.models.types.UserStatusType;
import com.nearme.repositories.JwtBlacklistRepository;
import com.nearme.repositories.UserRepository;
import com.nearme.security.jwt.JwtTokenProvider;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class AuthService {
 
	@Autowired
	private JwtTokenProvider jwtTokenProvider;

	@Autowired
	private UserRepository usersRepository;
	@Autowired
	public JwtBlacklistRepository jwtBlacklistRepository;
	@Autowired
	private AuthenticationManager authenticationManager;


	/**
	 * creates JWT token for user
	 * 
	 * @param username
	 * @return
	 */
	public String createJwtToken(String username) {
		String token = jwtTokenProvider.createToken(
			username, this.usersRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("Username " + username + "not found")).getRoles());
		return token;
	}

	/**
	 * Authenticates userEntity with credentials
	 * 
	 * @param authRequestDTO
	 * @return
	 * @throws Exception
	 */
	@Transactional
	public Map<String, String> authenticate(AuthenticationRequestDTO authRequestDTO)
			throws Exception {
		try {
			log.error("User "+ authRequestDTO.getUsername() + " is trying to login");
			String username = authRequestDTO.getUsername();
			String password = authRequestDTO.getPassword();
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password)).isAuthenticated();
			String token = this.createJwtToken(username);
			Map<String, String> model = new HashMap<String, String>();
			UserEntity loggedUser = this.usersRepository.findByUsername(username).get();
			loggedUser.setLoginAttempts(0);
			usersRepository.save(loggedUser);
			model.put("id", loggedUser.getIdUser().toString());
			model.put("username", username);
			model.put("name",  loggedUser.getName());
			model.put("surname", loggedUser.getSurname());
			model.put("token", token);
			log.info("UserEntity " + authRequestDTO.getUsername() + " logged into system");
			return model;
		} catch (Exception ex) {
			log.error("Error on login attempt: " + ex.getMessage());
			throw new Exception("badCredentialsError");
		}
	}

	/**
	 * Listens for authentication failures and saves the number of failed attempts. When the number
	 * is grater then 5 user gets disabled
	 * 
	 * @param event
	 */
	@EventListener
	public void authenticationFailed(AuthenticationFailureBadCredentialsEvent event) {
		String username = (String) event.getAuthentication().getPrincipal();
		UserEntity user = this.usersRepository.findByUsername(username).get();
		Integer attempts = user.getLoginAttempts();
		user.setLoginAttempts(attempts + 1);
		if (attempts > 5) {
			user.setStatus(UserStatusType.DISABLED);
		}
		usersRepository.save(user);
	}

	/**
	 * Adds token to blacklist in order to logout userEntity
	 * 
	 * @param token
	 * @return
	 */
	public JwtBlacklistEntity addTokenToBlacklist(String token) {
		JwtBlacklistEntity jwtBlacklistEntity = new JwtBlacklistEntity();
		jwtBlacklistEntity.setToken(token);
		return this.jwtBlacklistRepository.save(jwtBlacklistEntity);
	}

	/*
	 * Returns logged username
	 */
	public String getLoggedUserUsername() {
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		String username = ((UserDetails) principal).getUsername();
		return username;
	}

	/*
	 * Returns logged username
	 */
	public UserDetails getLoggedUserDetail() {
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		UserDetails userDetail = (UserDetails) principal;
		return userDetail;
	}


}
