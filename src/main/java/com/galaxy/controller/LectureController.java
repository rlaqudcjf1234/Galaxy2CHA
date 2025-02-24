package com.galaxy.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.galaxy.service.LectureService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping(value = "/lecture")
@RequiredArgsConstructor
@Slf4j
public class LectureController {

    @Autowired private LectureService lectureService;

    @GetMapping("/read")
    public Map<String, Object> read(
        @RequestParam(name = "seq")String seq
    )throws Exception {
        return lectureService.selectOne(seq);
    }






}