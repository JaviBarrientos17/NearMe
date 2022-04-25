package com.nearme.security.jwt;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;
import org.springframework.web.filter.GenericFilterBean;

import com.nearme.repositories.JwtBlacklistRepository;

@Component
public class JwtTokenFilter extends GenericFilterBean {
	@Autowired
	public JwtBlacklistRepository jwtBlacklistRepository;
	private JwtTokenProvider jwtTokenProvider;

	public JwtTokenFilter(JwtTokenProvider jwtTokenProvider) {
		this.jwtTokenProvider = jwtTokenProvider;
	}

	@Override
	public void doFilter(ServletRequest req, ServletResponse res, FilterChain filterChain) throws IOException, ServletException {
		if (jwtBlacklistRepository == null) {
			ServletContext servletContext = req.getServletContext();
			WebApplicationContext webApplicationContext = WebApplicationContextUtils.getWebApplicationContext(servletContext);
			jwtBlacklistRepository = webApplicationContext.getBean(JwtBlacklistRepository.class);
		}

		

		HttpServletRequest httpServletRequest = (HttpServletRequest) req;
		String token = jwtTokenProvider.resolveToken(httpServletRequest);
		if (token != null) {			
			if(!jwtBlacklistRepository.findByToken(token).isEmpty()) {// toke is on blacklist - user has logged out
				((HttpServletResponse) res).setStatus(HttpServletResponse.SC_UNAUTHORIZED);				
				return;
			}
			else if (this.jwtTokenProvider.validateToken(token)) {
				Authentication authentication = this.jwtTokenProvider.getAuthentication(token);
				SecurityContextHolder.getContext().setAuthentication(authentication);
				
			} else {
				((HttpServletResponse) res).setStatus(HttpServletResponse.SC_UNAUTHORIZED);
				return;
			}
		}
		filterChain.doFilter(req, res);
	}

}