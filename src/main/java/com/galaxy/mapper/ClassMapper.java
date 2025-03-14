package com.galaxy.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.galaxy.dto.ClassDto;
import com.galaxy.dto.SearchDto;

@Mapper
public interface ClassMapper {

    int selectCount(SearchDto dto) throws Exception;
    
    List<Map<String, Object>> selectList(SearchDto dto) throws Exception;
    
    List<Map<String, Object>> selectClassOptionsForApply() throws Exception;

    Map<String, Object> classDetail(int seq) throws Exception;

   
}
