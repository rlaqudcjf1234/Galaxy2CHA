package com.galaxy.interceptor;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.servlet.HandlerInterceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class SessionInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {

        HttpSession session = request.getSession();
        Map<String, Object> user = (Map<String, Object>) session.getAttribute("user");

        if(user == null){
            user = new HashMap<String, Object>();

            user.put("SEQ", "1");
            user.put("EMAIL", "system@soldesk.com");
            user.put("NAME", "dsad");
            user.put("PHONE", "12321321");
            user.put("DIVISION", "system");
            user.put("DIVISION_NAME", "관리자자");

            session.setAttribute("user", user);
        }

        return HandlerInterceptor.super.preHandle(request, response, handler);
    }
}