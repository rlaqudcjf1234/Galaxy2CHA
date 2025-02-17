package com.galaxy.mapper;

import com.galaxy.dto.StudentDto;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface StudentMapper {
    StudentDto selectStudentInfo(Long seq);

    StudentDto selectStudentInfoById(String id);
}