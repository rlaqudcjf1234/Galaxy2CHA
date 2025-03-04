package com.galaxy.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.galaxy.dto.ListDto;
import com.galaxy.dto.SearchDto;
import com.galaxy.dto.SeqDto;
import com.galaxy.service.TimeTableService;

import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping(value = "/table")
public class TimeTableController {

    @Autowired
    private TimeTableService timeTableService;

    @GetMapping("/list")
    public ListDto list(SeqDto dto) throws Exception { // SearchDto → SeqDto로 변경
        int count = timeTableService.selectCount(dto);
        List<Map<String, Object>> list = timeTableService.tablelist(dto);

        ListDto listDto = new ListDto(count, list);
        return listDto;
    }

}