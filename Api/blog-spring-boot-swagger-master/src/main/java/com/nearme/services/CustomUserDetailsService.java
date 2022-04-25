package com.nearme.services;

import com.nearme.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

	@Autowired
	private UserRepository usersRepository;

	/**
	 * Gets user by username
	 */
	@Override
	public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
		return this.usersRepository.findByUsername(userName)
				.orElseThrow(() -> new UsernameNotFoundException("Username: " + userName + " not found"));
	}
}