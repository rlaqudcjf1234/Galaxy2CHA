package com.galaxy.util;

import java.util.Map;

import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

public class HttpSessionUtil {

    public static HttpServletRequest getRequest()throws Exception {

        ServletRequestAttributes attr = (ServletRequestAttributes)RequestContextHolder.currentRequestAttributes();

        return attr.getRequest();
    }

    public static HttpSession getSession()throws Exception {

        HttpServletRequest request = getRequest();

        return request.getSession();
    }

    public static String getLoginSeq() {

        String seq = "";

        try {

            HttpSession session = getSession();

            Map<String, Object> user = (Map<String, Object>)session.getAttribute("user");

            seq = (String)user.get("SEQ");

        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
        }

        return seq;
    }

    public String getLoginEmail() {

        String email = "";

        try {
            HttpSession session = getSession();

            Map<String, Object> user = (Map<String, Object>)session.getAttribute("user");

            email = (String)user.get("EMAIL");

        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
        }

        return email;
    }
}
