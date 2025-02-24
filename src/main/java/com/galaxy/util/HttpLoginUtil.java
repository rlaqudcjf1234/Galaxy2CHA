package com.galaxy.util;

import java.nio.charset.StandardCharsets;
import java.util.Optional;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;

@Component
public class HttpLoginUtil {

    public static String key;
    public static final String BEARER = "Bearer ";  
    public static final String AUTHORIZATION_HEADER = "Authorization";

    public static HttpServletRequest getRequest()throws Exception {

        ServletRequestAttributes attr = (ServletRequestAttributes)RequestContextHolder.currentRequestAttributes();

        return attr.getRequest();
    }

    @Value("${jwt.secret-key}")
    public void setSecretKey(String secretKey) {
        key = secretKey;
    }

    public static String getSeq() {

        String seq = "";

        try {
            SecretKey secretKey = Keys.hmacShaKeyFor(
                HttpLoginUtil.key.getBytes(StandardCharsets.UTF_8)
            );
            HttpServletRequest request = getRequest();
            String accessToken = Optional.ofNullable(request.getHeader(AUTHORIZATION_HEADER))  
                .filter(token -> token.startsWith(BEARER))  
                .map(token -> token.replace(BEARER, ""))
                .orElseThrow(() -> new AuthenticationServiceException("No access token"));
                
            seq = Jwts
                .parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(accessToken)
                .getPayload()
                .get("seq", String.class);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return seq;
    }

    public static String getClass_seq() {

        String class_seq = "";

        try {
            SecretKey secretKey = Keys.hmacShaKeyFor(
                HttpLoginUtil.key.getBytes(StandardCharsets.UTF_8)
            );
            HttpServletRequest request = getRequest();
            String accessToken = Optional.ofNullable(request.getHeader(AUTHORIZATION_HEADER))  
                .filter(token -> token.startsWith(BEARER))  
                .map(token -> token.replace(BEARER, ""))
                .orElseThrow(() -> new AuthenticationServiceException("No access token"));
                
            class_seq = Jwts
                .parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(accessToken)
                .getPayload()
                .get("class_seq", String.class);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return class_seq;
    }

    public String getName() {

        String name = "";

        try {
            SecretKey secretKey = Keys.hmacShaKeyFor(
                HttpLoginUtil.key.getBytes(StandardCharsets.UTF_8)
            );
            HttpServletRequest request = getRequest();
            String accessToken = Optional.ofNullable(request.getHeader(AUTHORIZATION_HEADER))  
                .filter(token -> token.startsWith(BEARER))  
                .map(token -> token.replace(BEARER, ""))
                .orElseThrow(() -> new AuthenticationServiceException("No access token"));

            name = Jwts
                .parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(accessToken)
                .getPayload()
                .get("name", String.class);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return name;
    }

    public String getEmail() {

        String email = "";

        try {
            SecretKey secretKey = Keys.hmacShaKeyFor(
                HttpLoginUtil.key.getBytes(StandardCharsets.UTF_8)
            );
            HttpServletRequest request = getRequest();
            String accessToken = Optional.ofNullable(request.getHeader(AUTHORIZATION_HEADER))  
                .filter(token -> token.startsWith(BEARER))  
                .map(token -> token.replace(BEARER, ""))
                .orElseThrow(() -> new AuthenticationServiceException("No access token"));

            email = Jwts
                .parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(accessToken)
                .getPayload()
                .get("email", String.class);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return email;
    }

    public String getId() {

        String id = "";

        try {
            SecretKey secretKey = Keys.hmacShaKeyFor(
                HttpLoginUtil.key.getBytes(StandardCharsets.UTF_8)
            );
            HttpServletRequest request = getRequest();
            String accessToken = Optional.ofNullable(request.getHeader(AUTHORIZATION_HEADER))  
                .filter(token -> token.startsWith(BEARER))  
                .map(token -> token.replace(BEARER, ""))
                .orElseThrow(() -> new AuthenticationServiceException("No access token"));

            id = Jwts
                .parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(accessToken)
                .getPayload()
                .get("id", String.class);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return id;
    }
}
