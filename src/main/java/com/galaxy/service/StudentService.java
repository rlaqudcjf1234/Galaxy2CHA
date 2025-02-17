package com.galaxy.service;

import com.galaxy.dto.StudentDto;

public interface StudentService {
    StudentDto getStudentInfo(Long seq);
    
    StudentDto getStudentInfoById(String id);
    
}

