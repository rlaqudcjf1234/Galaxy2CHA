package com.galaxy.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.galaxy.dto.CodeDto;
import com.galaxy.dto.SearchDto;
import com.galaxy.mapper.CodeMapper;
import com.galaxy.service.CodeService;

@Service
public class CodeServiceImpl implements CodeService {

    @Autowired
    CodeMapper codeMapper;
    

    @Override
    public List<Map<String, Object>> selectUseCode(int code_id) throws Exception {
        return codeMapper.selectUseCode(code_id);
    }

    @Override
    public List<Map<String, Object>> selectUse1() throws Exception {
        return codeMapper.selectUseCode(1);
    }

    @Override
    public List<Map<String, Object>> selectUse2() throws Exception {
        return codeMapper.selectUseCode(2);
    }
    @Override
    public List<Map<String, Object>> selectUse10() throws Exception {
        return codeMapper.selectUseCode(10);
    }
    @Override
    public List<Map<String, Object>> selectUse14() throws Exception {
        return codeMapper.selectUseCode(14);
    }
    @Override
    public List<Map<String, Object>> selectUse15() throws Exception {
        return codeMapper.selectUseCode(15);
    }

    public List<Map<String, Object>> selectGroupList(SearchDto dto) throws Exception{
        return codeMapper.selectGroupList(dto);
    }
    
    public int insertCode(CodeDto dto) throws Exception{
        return codeMapper.insertCode(dto);
    }

    public int selectCount(SearchDto dto) throws Exception{
        return codeMapper.selectCount(dto);
    }

    public Long updateCode(CodeDto dto) throws Exception{
        return codeMapper.updateCode(dto);
    }

    public Map<String, Object> readCode(String group_id) throws Exception{
        return codeMapper.readCode(group_id);
    }

}
