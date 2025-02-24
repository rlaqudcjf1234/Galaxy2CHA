package com.galaxy.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.galaxy.dto.ClassDto;
import com.galaxy.dto.ListDto;
import com.galaxy.dto.SearchDto;
import com.galaxy.service.ClassService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping(value = "/class")
@RequiredArgsConstructor
@Slf4j
public class ClassController {

    @Autowired
    ClassService classService;

    @GetMapping("/list")
    public ResponseEntity<ListDto> list(SearchDto dto) {
        try {
            int count = classService.selectCount(dto);
            List<Map<String, Object>> list = classService.selectList(dto);
            ListDto listDto = new ListDto(count, list);
            return ResponseEntity.ok(listDto);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/options")
    public ResponseEntity<ListDto> getClassOptions(SearchDto dto) {
        try {
            List<Map<String, Object>> list = classService.selectClassOptionsForApply();
            return ResponseEntity.ok(new ListDto(list.size(), list));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{seq}")
    public ResponseEntity<?> getClassDetail(@PathVariable("seq") int seq) { // "seq" 이름을 명시적으로 지정
        try {
            Map<String, Object> classInfo = classService.getClassDetail(seq);
            if (classInfo == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(classInfo);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("상세 정보 조회 중 오류가 발생했습니다.");
        }
    }


}