package com.galaxy.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.galaxy.dto.CodeDto;
import com.galaxy.service.CodeService;

@RestController
@RequestMapping(value = "/code")
public class CodeController {

    @Autowired private CodeService codeService;

    @GetMapping("/list")
    public List<CodeDto> list(@RequestParam(name = "text")String text)throws Exception {

        List<CodeDto> list = new ArrayList<CodeDto>();

        switch (text) {
            case "class":
                list.add(new CodeDto("division", codeService.selectUseCode(10)));
                break;
            default:
                break;

        }

        return list;
    }
}
