package com.galaxy.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import com.galaxy.service.JwtService;
import com.galaxy.service.impl.model.User;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class LoginSuccessHandler implements AuthenticationSuccessHandler {  
    
    private final JwtService jwtService;  
  
    @Override  
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {  
        User user = (User) authentication.getPrincipal();
        String username = authentication.getName();

        String accessToken = jwtService.generateAccessToken(user);  
        String refreshToken = jwtService.generateRefreshToken();  
  
        response.setContentType("application/json");  
        response.setCharacterEncoding("utf-8");  
  
        jwtService.setAccessToken(response, accessToken);  
        jwtService.setRefreshToken(response, refreshToken, username);
    }  
}