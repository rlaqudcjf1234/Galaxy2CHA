package com.galaxy.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.galaxy.service.LectureService;

@RestController
@RequestMapping(value = "/lecture")
public class LectureController {

    @Autowired private LectureService lectureService;

    @GetMapping("/read")
    public Map<String, Object> read(
        @RequestParam(name = "seq")String seq
    )throws Exception {
        return lectureService.selectOne(seq);
    }

}