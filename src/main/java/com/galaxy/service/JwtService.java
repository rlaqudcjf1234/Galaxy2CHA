package com.galaxy.service;

import java.util.Optional;

import com.galaxy.service.impl.model.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public interface JwtService {

    String generateAccessToken(User user);
    String generateRefreshToken();

    Optional<String> extractAccessToken(HttpServletRequest request);
    Optional<String> extractRefreshToken(HttpServletRequest request);
    Optional<String> extractSubject(String accessToken);
    Jws<Claims> validateToken(String token) throws Exception;

    void setAccessToken(HttpServletResponse response, String accessToken);
    void setRefreshToken(HttpServletResponse response, String refreshToken, String username);

	void removeRefreshToken(String refreshToken);  
	String getUsernameByRefreshToken(String refreshToken) throws Exception;
}
