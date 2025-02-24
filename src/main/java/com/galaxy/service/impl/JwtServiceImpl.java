package com.galaxy.service.impl;

import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.Date;
import java.util.Optional;
import java.util.UUID;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;

import com.galaxy.mapper.JwtMapper;
import com.galaxy.service.JwtService;
import com.galaxy.service.impl.model.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Service 
public class JwtServiceImpl implements JwtService{  
  
    public static final String BEARER = "Bearer ";  
    public static final String AUTHORIZATION_HEADER = "Authorization";  
    public static final String REFRESH_TOKEN_COOKIE_NAME = "Refresh";  
  
    @Value("${jwt.access-token-expiration}")  
    private long accessTokenExpiration;  
  
    @Value("${jwt.refresh-token-expiration}")  
    private long refreshTokenExpiration;  
  
    private final SecretKey secretKey;

    @Autowired
    private JwtMapper jwtMapper;
  
    public JwtServiceImpl(@Value("${jwt.secret-key}") String secretKey) {
        this.secretKey = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
    }
  
    @Override    
    public String generateAccessToken(User user) {  
        Date now = new Date();  
        return Jwts.builder()  
            .subject(user.getUsername())
            .claim("seq", user.getSeq())
            .claim("class_seq", user.getClass_seq())
            .claim("name", user.getName())
            .claim("email", user.getEmail())
            .claim("id", user.getId())
            .signWith(secretKey, Jwts.SIG.HS512)  
            .issuedAt(now)  
            .expiration(new Date(now.getTime() + accessTokenExpiration))  
            .compact();  
    }  
  
    @Override    
    public String generateRefreshToken() {  
        Date now = new Date();  
        return Jwts.builder()  
                .claim("sub", UUID.randomUUID().toString())  
                .signWith(secretKey, Jwts.SIG.HS512)  
                .issuedAt(now)  
                .expiration(new Date(now.getTime() + refreshTokenExpiration))  
                .compact();  
    }  
   
    @Override    
    public Optional<String> extractAccessToken(HttpServletRequest request) {  
        return Optional.ofNullable(request.getHeader(AUTHORIZATION_HEADER))  
                .filter(token -> token.startsWith(BEARER))  
                .map(token -> token.replace(BEARER, ""));  
    }  
  
    @Override    
    public Optional<String> extractRefreshToken(HttpServletRequest request) {  
        return Optional.ofNullable(request.getCookies())  
                .flatMap(cookies -> Arrays.stream(cookies)  
                        .filter(e -> e.getName().equals(REFRESH_TOKEN_COOKIE_NAME))  
                        .findAny())  
                .map(Cookie::getValue);
    }  
   
    @Override    
    public Optional<String> extractSubject(String accessToken) {  
        try {  
            Jws<Claims> claims = validateToken(accessToken);  
            return Optional.of(claims.getPayload().getSubject());  
        }  
        catch (Exception e) {  
            return Optional.empty();  
        }
    }  
  
    @Override    
    public Jws<Claims> validateToken(String token) throws Exception {  
        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token);  
    }  
  
    @Override    
    public void setAccessToken(HttpServletResponse response, String accessToken) {  
        accessToken = BEARER + accessToken;  
        response.setHeader(AUTHORIZATION_HEADER, accessToken);  
    }  

    @Override
    public void setRefreshToken(HttpServletResponse response, String refreshToken, String username) {
        ResponseCookie cookie = ResponseCookie.from(REFRESH_TOKEN_COOKIE_NAME, refreshToken)
                .maxAge(-1)
                .path("/")
                .secure(true)
                .sameSite("None")
                .httpOnly(true)
                .build();
        response.setHeader("Set-Cookie", cookie.toString());
        saveRefreshToken(refreshToken, username);
    }

    private void saveRefreshToken(String refreshToken, String username) {
        jwtMapper.insertOne(refreshToken, username, refreshTokenExpiration);
    }

    @Override
    public void removeRefreshToken(String refreshToken) {
        jwtMapper.deleteOne(refreshToken);
    }

    @Override
    public String getUsernameByRefreshToken(String refreshToken) throws Exception {
        validateToken(refreshToken);
        jwtMapper.deleteExpir();
        return jwtMapper.selectOne(refreshToken);
    }
}