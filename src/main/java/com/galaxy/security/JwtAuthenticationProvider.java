package com.galaxy.security;

import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.util.ClassUtils;

import com.galaxy.service.JwtService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class JwtAuthenticationProvider implements AuthenticationProvider {  
  
    private final JwtService jwtService;  

    private UserDetailsService userDetailsService;  
  
    @Override  
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {  
        String accessToken = authentication.getPrincipal().toString();  
        UserDetails userDetails = retrieveUser(accessToken);  
        return new JwtAuthenticationToken(userDetails, null, userDetails.getAuthorities());  
    }  
  
    protected UserDetails retrieveUser(String accessToken) throws AuthenticationException {  
        return jwtService.extractSubject(accessToken)  
                .map(userDetailsService::loadUserByUsername)  
                .orElseThrow(()-> new AuthenticationServiceException("Could not extract username from JWT token"));  
    }  
  
    @Override  
    public boolean supports(Class<?> authentication) {  
        return ClassUtils.isAssignable(JwtAuthenticationToken.class, authentication);  
    }  
  
    public void setUserDetailsService(UserDetailsService userDetailsService) {  
        this.userDetailsService = userDetailsService;  
    }
}