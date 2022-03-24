package com.nearme.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import com.nearme.models.types.DeployEnvironmentType;
import com.nearme.models.types.RoleType;
import com.nearme.security.jwt.JwtConfigurer;
import com.nearme.security.jwt.JwtTokenProvider;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Value("${spring.materials-app.frontend.url}")
	private String frontendOrigin;

	@Value("${spring.environment}")
	private DeployEnvironmentType deployEnvironment;

	@Autowired
	JwtTokenProvider jwtTokenProvider;

	@Autowired
	private UserDetailsService userDetailsService;

	@Bean
	public BCryptPasswordEncoder bCryptPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}

	@Bean
	public CorsFilter corsFilter() {
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		CorsConfiguration config = new CorsConfiguration();
		config.setAllowCredentials(true);
		// setting allowed origins
		if (!this.deployEnvironment.equals(DeployEnvironmentType.prod)) {
			config.addAllowedOrigin("http://localhost:4200");
			config.addAllowedOrigin("http://localhost:8085");
		} else if (this.deployEnvironment.equals(DeployEnvironmentType.prod)) {
			config.addAllowedOrigin("https://xxxx.com");
			config.addAllowedOrigin("https://sss.dicht.de:8080");
		}
		log.info("adding cors frontend:" + frontendOrigin);
		config.addAllowedOrigin(frontendOrigin);
		config.addAllowedHeader("*");
		config.addAllowedMethod("OPTIONS");
		config.addAllowedMethod("GET");
		config.addAllowedMethod("POST");
		config.addAllowedMethod("PUT");
		config.addAllowedMethod("DELETE");
		source.registerCorsConfiguration("/**", config);
		return new CorsFilter(source);
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.httpBasic().disable().csrf().disable().sessionManagement()
			.sessionCreationPolicy(SessionCreationPolicy.STATELESS).and().authorizeRequests()
			// authentication
			.antMatchers("/api/", "/api/").permitAll()
			// users + users admin
			
			//jwt
			.and().apply(new JwtConfigurer(jwtTokenProvider));
		// enabling cors
		http.cors();
	}

	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder());
	}
}