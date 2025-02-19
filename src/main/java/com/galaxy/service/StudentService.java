package com.galaxy.service;

import java.util.Map;

import com.galaxy.dto.StudentDto;

public interface StudentService {
    
    StudentDto getStudentInfoById(String id);

    Map<String, Object> getStudentInfo(Long seq) throws Exception;

    Map<String, Object> getStudentMypage(Long seq) throws Exception;
}

