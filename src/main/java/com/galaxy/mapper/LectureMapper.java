package com.galaxy.mapper;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface LectureMapper {

    Map<String, Object> selectOne(String seq)throws Exception;

    
}
