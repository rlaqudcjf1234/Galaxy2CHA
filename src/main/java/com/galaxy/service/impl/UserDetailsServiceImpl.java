package com.galaxy.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.galaxy.dto.UserDto;
import com.galaxy.mapper.UserMapper;
import com.galaxy.service.impl.model.User;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserMapper usermapper;
  
    @Override  
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        try {
            UserDto dto = usermapper.selectUseOne(username);
            return new User(dto);
        } catch (Exception e) {
            throw new UsernameNotFoundException("username not found");
        }
    }  
}