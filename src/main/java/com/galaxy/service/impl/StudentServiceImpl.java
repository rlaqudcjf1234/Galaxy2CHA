package com.galaxy.service.impl;

import com.galaxy.dto.StudentDto;
import com.galaxy.mapper.StudentMapper;
import com.galaxy.service.StudentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class StudentServiceImpl implements StudentService {

    private final StudentMapper studentMapper;

    @Override
    @Transactional(readOnly = true)
    public StudentDto getStudentInfo(Long seq) {
        return studentMapper.selectStudentInfo(seq);
    }

    @Override
    @Transactional(readOnly = true)
    public StudentDto getStudentInfoById(String id) {
        log.info("Service 계층 - 학생 정보 조회 시작. ID: {}", id);

        try {
            StudentDto student = studentMapper.selectStudentInfoById(id);
            if (student == null) {
                log.warn("Service 계층 - 조회 실패: ID {}에 해당하는 데이터 없음", id);
                return null;
            }
            log.info("Service 계층 - 조회 성공: {}", student.getName());
            return student;
        } catch (Exception e) {
            log.error("Service 계층 - 데이터 매핑 오류 발생: ", e);
            return null;
        }
    }

}