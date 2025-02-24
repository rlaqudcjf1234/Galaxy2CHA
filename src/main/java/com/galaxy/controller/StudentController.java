package com.galaxy.controller;

import com.galaxy.dto.StudentDto;
import com.galaxy.service.StudentService;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/student")
@RequiredArgsConstructor
@Slf4j
public class StudentController {

    private final StudentService studentService;


    @GetMapping("/mypage/{seq}")
    public ResponseEntity<?> getStudentMypage(@PathVariable("seq") Long seq) {
        log.info("============================================");
        log.info("Entering getStudentAftercare method");
        log.info("Requested sequence number: {}", seq);
        
        try {
            // studentService에서 조인된 데이터를 한 번에 가져옴
            Map<String, Object> mypageInfo = studentService.getStudentMypage(seq);
            log.info("Service response: {}", mypageInfo);
            
            if (mypageInfo == null) {
                log.warn("No aftercare info found for seq: {}", seq);
                return ResponseEntity.notFound().build();
            }
            
            return ResponseEntity.ok(mypageInfo);
        } catch (Exception e) {
            log.error("Error processing request for seq: {}", seq, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("정보 조회 중 오류가 발생했습니다.");
        }
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