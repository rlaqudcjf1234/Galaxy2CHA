package com.galaxy.controller;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.galaxy.dto.ListDto;
import com.galaxy.dto.QuestionDto;
import com.galaxy.dto.SearchDto;
import com.galaxy.service.SurveyService;
import jakarta.validation.Valid;

@RestController
@RequestMapping(value = "/survey")
public class SurveyController {

    @Autowired
    private SurveyService surveyService;

    @GetMapping("/list")
    public ListDto list(SearchDto dto) throws Exception {

        int count = surveyService.selectCount(dto);
        List<Map<String, Object>> list = surveyService.selectList(dto);

        return new ListDto(count, list);
    }

    @GetMapping("/read")
    public Map<String, Object> read(@RequestParam(name = "question_seq") String question_seq)
            throws Exception {
        Map<String, Object> map = surveyService.selectOne(question_seq);

        return map;
    }

    @PostMapping("/add")
    public void add(@Valid QuestionDto dto) throws Exception {
        surveyService.insertOne(dto);
    }
}
