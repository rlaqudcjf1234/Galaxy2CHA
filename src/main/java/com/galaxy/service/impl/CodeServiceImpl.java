package com.galaxy.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.galaxy.mapper.CodeMapper;
import com.galaxy.service.CodeService;

@Service
public class CodeServiceImpl implements CodeService {

    @Autowired
    CodeMapper codeMapper;

    @Override
    public List<Map<String, Object>> selectUseCode(int group_id) throws Exception {
        return codeMapper.selectUseCode(group_id);
    }

}
