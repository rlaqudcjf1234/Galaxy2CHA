package com.galaxy.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.galaxy.service.SlideService;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping(value = "/slide")
public class SlideController {
    @Autowired
    private SlideService slideService;

    @GetMapping("/read")
    public List<Map<String, Object>> slideList() throws Exception {
        return slideService.slideList();
    }
}
