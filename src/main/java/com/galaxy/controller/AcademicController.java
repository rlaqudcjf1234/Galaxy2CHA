package com.galaxy.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.galaxy.service.AcademicService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping(value = "/student")
@RequiredArgsConstructor
@Slf4j
public class AcademicController {

    @Autowired
    AcademicService academicService;

    @PostMapping("/insert")
    public ResponseEntity<?> insertAcademic(@RequestBody Map<String, Object> params) {
        try {
            academicService.insertAcademic(params);
            return ResponseEntity.ok("학력 정보가 성공적으로 등록되었습니다.");
        } catch (Exception e) {
            log.error("학력 정보 등록 중 오류 발생", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("학력 정보 등록 중 오류가 발생했습니다.");
        }
    }

    @GetMapping("/{seq}")
    public ResponseEntity<?> getAcademic(@PathVariable int seq) {
        try {
            List<Map<String, Object>> academic = academicService.readAcademic(seq);
            return ResponseEntity.ok(academic);
        } catch (Exception e) {
            log.error("학력 정보 조회 중 오류 발생", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("학력 정보 조회 중 오류가 발생했습니다.");
        }
    }

    // 마이페이지용 조회 메서드 추가
    @GetMapping("/academic/info/{seq}")
    public ResponseEntity<?> getAcademicInfo(@PathVariable("seq") int seq) {
        try {
            log.info("Fetching academic info for student: {}", seq);
            List<Map<String, Object>> academicList = academicService.getAcademicInfo(seq);
            return ResponseEntity.ok(academicList);
        } catch (Exception e) {
            log.error("학력 정보 조회 중 오류 발생", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("학력 정보 조회 중 오류가 발생했습니다.");
        }
    }

    // 삭제 메서드 추가
    @DeleteMapping("/academic/{seq}/{sort}")
    public ResponseEntity<?> deleteAcademicInfo(
            @PathVariable("seq") int seq,
            @PathVariable("sort") int sort) {
        try {
            log.info("Deleting academic info for student {} with sort: {}", seq, sort);
            Map<String, Object> params = new HashMap<>();
            params.put("STUDENT_SEQ", seq);
            params.put("SORT", sort);
            academicService.deleteAcademicInfo(params);
            return ResponseEntity.ok().body("학력 정보가 성공적으로 삭제되었습니다.");
        } catch (Exception e) {
            log.error("학력 정보 삭제 중 오류 발생", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("학력 정보 삭제 중 오류가 발생했습니다.");
        }
    }

}