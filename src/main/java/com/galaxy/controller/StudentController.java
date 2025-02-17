package com.galaxy.controller;

import com.galaxy.dto.StudentDto;
import com.galaxy.service.StudentService;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/student")
@RequiredArgsConstructor
@Slf4j
public class StudentController {

    private final StudentService studentService;

    @GetMapping("/{seq}")
    public ResponseEntity<StudentDto> getStudentInfo(@PathVariable Long seq, HttpSession session) {
        Long studentSeq = (Long) session.getAttribute("studentSeq");

        if (studentSeq == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        if (!studentSeq.equals(seq)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        StudentDto studentInfo = studentService.getStudentInfo(seq);
        if (studentInfo == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(studentInfo);
    }

    
    @GetMapping("/info/{id}")
    public ResponseEntity<StudentDto> getStudentInfoById(@PathVariable String id) {
        // 입력받은 ID 값 로깅
        log.info("조회 요청된 학생 ID: {}", id);
        
        StudentDto studentInfo = studentService.getStudentInfoById(id);
        
        // 조회 결과 로깅
        if (studentInfo == null) {
            log.warn("ID: {}로 조회된 학생 정보가 없습니다.", id);
            return ResponseEntity.notFound().build();
        }
        
        log.info("학생 정보 조회 성공 - ID: {}, 이름: {}", id, studentInfo.getName());
        return ResponseEntity.ok(studentInfo);
    }
}