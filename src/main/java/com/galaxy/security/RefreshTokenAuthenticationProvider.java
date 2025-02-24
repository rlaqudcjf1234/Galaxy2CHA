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
public class RefreshTokenAuthenticationProvider implements AuthenticationProvider {  
  
    private final JwtService jwtService;  
    private UserDetailsService userDetailsService;  
  
    @Override  
    public Authentication authenticate(Authentication authentication) throws AuthenticationException{  
        String refreshToken = authentication.getPrincipal().toString();  
        String username;  
  
        try {  
            username =  jwtService.getUsernameByRefreshToken(refreshToken);  
            jwtService.removeRefreshToken(refreshToken);  
        }  
        catch (Exception e) {  
            throw new AuthenticationServiceException(e.getMessage(), e);  
        }  
  
        UserDetails userDetails = userDetailsService.loadUserByUsername(username);  
        return RefreshTokenAuthenticationToken.authenticated(userDetails, null, userDetails.getAuthorities());  
    }  
  
    @Override  
    public boolean supports(Class<?> authentication) {  
        return ClassUtils.isAssignable(RefreshTokenAuthenticationToken.class, authentication);  
    }  
  
    public void setUserDetailsService(UserDetailsService userDetailsService) {  
        this.userDetailsService = userDetailsService;  
    }  
}