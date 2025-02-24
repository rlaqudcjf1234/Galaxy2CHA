package com.galaxy.security;

import java.io.IOException;

import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;

import com.galaxy.service.JwtService;
import com.galaxy.service.impl.model.User;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class RefreshTokenAuthenticationFilter extends AbstractAuthenticationProcessingFilter {  
  
    private static final String REFRESH_URL = "/refresh";  
    private final JwtService jwtService;  
  
    public RefreshTokenAuthenticationFilter(JwtService jwtService) {  
        super(REFRESH_URL);  
        this.jwtService = jwtService;  
    }  
  
    @Override  
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException, IOException, ServletException {  
        String refreshToken = jwtService.extractRefreshToken(request)  
                .orElseThrow(() -> new AuthenticationServiceException("No refresh token provided"));  
  
  
        RefreshTokenAuthenticationToken refreshTokenAuthenticationToken= RefreshTokenAuthenticationToken.unAuthenticated(refreshToken, null);  
        return this.getAuthenticationManager().authenticate(refreshTokenAuthenticationToken);  
    }  
  
    @Override  
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) throws IOException, ServletException {  
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