package com.galaxy.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import com.galaxy.dto.CodeDto;
import com.galaxy.dto.ListDto;
import com.galaxy.dto.SearchDto;
import com.galaxy.service.CodeService;

import jakarta.validation.Valid;

@RestController
@RequestMapping(value = "/code")
public class CodeController {

    @Autowired
    CodeService codeService;

    @GetMapping("/list")
    public ListDto selectGroupList(SearchDto dto) throws Exception {

        int count = codeService.selectCount(dto);
        List<Map<String, Object>> list = codeService.selectGroupList(dto);

        ListDto listDto = new ListDto(count, list);

        return listDto;
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(@Valid @RequestBody CodeDto dto) {
        try {
            codeService.insertCode(dto);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping("/read")
    public Map<String, Object> mod(@RequestParam(name = "group_id") String group_id) throws Exception {
        Map<String, Object> map = codeService.readCode(group_id);

        return map;
    }

    @PostMapping("/mod")
    public void mod(@Valid @RequestBody CodeDto dto) throws Exception {

        codeService.updateCode(dto);
    }

    @RequestMapping(value = "/use", method = RequestMethod.GET)
    public List<CodeDto> list(SearchDto dto) throws Exception {

        List<CodeDto> list = new ArrayList<CodeDto>();

        switch (dto.getText()) {
            case "adminAdd":
                list.add(new CodeDto("division", codeService.selectUse2()));
                break;
            case "adminMod":
                list.add(new CodeDto("use_yn", codeService.selectUse1()));
                list.add(new CodeDto("division", codeService.selectUse2()));
                break;
            case "lecDocument":
                list.add(new CodeDto("division", codeService.selectUse10()));
                break;
            case "lectureMod":
                list.add(new CodeDto("division", codeService.selectUse14()));
                list.add(new CodeDto("category", codeService.selectUse15()));
                break;
            default:
                break;

        }

        return list;
    }

}
