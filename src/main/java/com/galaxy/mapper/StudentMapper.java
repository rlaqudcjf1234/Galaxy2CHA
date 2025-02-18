package com.galaxy.mapper;

import com.galaxy.dto.StudentDto;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface StudentMapper {
   

    StudentDto selectStudentInfoById(String id);

    Map<String, Object> getStudentInfo(Long seq);

    Map<String, Object> getStudentAftercare(Long seq);

}   

