package com.galaxy.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.galaxy.dto.ClassDto;
import com.galaxy.dto.ListDto;
import com.galaxy.dto.SearchDto;
import com.galaxy.service.ClassService;

@RestController
@RequestMapping(value = "/class")
@CrossOrigin(origins = "http://localhost:5273")
public class ClassController {

    @Autowired
    ClassService classService;

    @GetMapping("/list")
    public ListDto list(SearchDto dto) throws Exception {
        int count = classService.selectCount(dto);
        List<Map<String, Object>> list = classService.selectList(dto);
        ListDto listDto = new ListDto(count, list);
        return listDto;
    }

    @PostMapping("/add")
    public void add(ClassDto dto) throws Exception {
        classService.insertClass(dto);
    }

    @GetMapping("/detail")
    public ResponseEntity<?> getClassDetail(
            @RequestParam(name = "seq") String seq) throws Exception {
        try {
            Map<String, Object> classDetail = classService.getClassDetail(seq);
            if (classDetail == null) {
                return ResponseEntity
                        .notFound()
                        .build();
            }
            return ResponseEntity.ok(classDetail);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("상세 정보 조회 중 오류가 발생했습니다.");
        }
    }

    @GetMapping("/options")
    public ListDto getClassOptions(SearchDto dto) throws Exception {
        List<Map<String, Object>> list = classService.selectClassOptionsForApply();
        return new ListDto(list.size(), list);
    }
}
