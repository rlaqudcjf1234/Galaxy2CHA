package com.galaxy.service.impl.model;

import java.util.Collection;
import java.util.Collections;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.galaxy.dto.UserDto;

public class User implements UserDetails{

    UserDto dto;

    public User(UserDto dto) {
        this.dto = dto;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(new SimpleGrantedAuthority("user"));
    }

    public String getSeq() {
        return dto.getSeq();
    }

    public String getClass_seq() {
        return dto.getClass_seq();
    }

    public String getName() {
        return dto.getName();
    }

    public String getEmail() {
        return dto.getEmail();
    }

    public String getId() {
        return dto.getId();
    }

    @Override
    public String getUsername() {
        return dto.getId();
    }

    @Override
    public String getPassword() {
        return dto.getPassword();
    }

}
