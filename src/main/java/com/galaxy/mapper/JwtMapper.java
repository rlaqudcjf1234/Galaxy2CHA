package com.galaxy.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface JwtMapper {

    void insertOne(@Param("refresh_token") String refreshToken, @Param("email") String email, @Param("expiration") long refreshTokenExpiration);

    void deleteOne(@Param("refresh_token") String refreshToken);

    void deleteExpir();

    String selectOne(@Param("refresh_token") String refreshToken);

    

}
