package com.galaxy.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.galaxy.service.CertificateService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping(value = "/student")
@RequiredArgsConstructor
@Slf4j
public class CertificateController {

    @Autowired
    private CertificateService certificateService;

    @PostMapping("/certification/{seq}")
    public ResponseEntity<?> insertCertificate(
            @PathVariable("seq") int seq,
            @RequestBody Map<String, Object> certData) {
        try {
            log.info("Received certification data for student {}: {}", seq, certData);
            certData.put("STUDENT_SEQ", seq);
            certificateService.insertCertificate(certData);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            log.error("Failed to insert certificate", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("자격증 등록 중 오류가 발생했습니다.");
        }
    }

    @GetMapping("/certification/{seq}")
    public ResponseEntity<?> readCertificate(@PathVariable("seq") int seq) {
        try {
            log.info("Fetching certificate data for student: {}", seq);
            List<Map<String, Object>> certDataList = certificateService.readCertificate(seq);
            return ResponseEntity.ok(certDataList);
        } catch (Exception e) {
            log.error("Failed to fetch certificate data", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("자격증 정보 조회 중 오류가 발생했습니다.");
        }
    }

    @DeleteMapping("/certification/{seq}/{sort}")
    public ResponseEntity<?> deleteCertificate(
            @PathVariable("seq") int seq,
            @PathVariable("sort") int sort) {
        try {
            log.info("Deleting certification for student {} with sort: {}", seq, sort);
            Map<String, Object> params = new HashMap<>();
            params.put("STUDENT_SEQ", seq); // 대문자로 파라미터명 통일
            params.put("SORT", sort); // 대문자로 파라미터명 통일
            certificateService.deleteCertificate(params);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            log.error("Failed to delete certificate", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("자격증 삭제 중 오류가 발생했습니다.");
        }
    }
}
