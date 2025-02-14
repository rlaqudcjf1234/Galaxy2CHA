package com.galaxy.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.galaxy.dto.CodeDto;
import com.galaxy.dto.SearchDto;

@Mapper
public interface CodeMapper {

    List<Map<String, Object>> selectUseCode(int code_id) throws Exception;

    List<Map<String, Object>> selectGroupList(SearchDto dto) throws Exception;
    
    int selectCount(SearchDto dto) throws Exception;

    int insertCode(CodeDto dto) throws Exception;

    Long updateCode(CodeDto dto) throws Exception;

    Map<String, Object> readCode(String group_id) throws Exception;
    
}