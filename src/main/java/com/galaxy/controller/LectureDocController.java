package com.galaxy.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.galaxy.service.CodeService;
import com.galaxy.service.LectureDocService;

@RestController
@RequestMapping(value = "/lectureDoc")
public class LectureDocController {

    @Autowired private CodeService codeService;

    @Autowired private LectureDocService lectureDocService;

    @GetMapping("/list")
    public Map<String, Object> list(
        @RequestParam(name = "lecture_seq")String lecture_seq
    )throws Exception {

        Map<String, Object> result = new HashMap<>();

        List<Map<String, Object>> codeList = codeService.selectUseCode(10);

        for (Map<String, Object> map : codeList) {
            String division = (String)map.get("CODE_ID");

            List<String> list = lectureDocService.selectList(lecture_seq, division);

            if (list != null && list.size() > 0) {
                result.put(division, list);
            }
        }

        return result;
    }
}
