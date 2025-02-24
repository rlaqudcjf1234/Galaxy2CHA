package com.galaxy.service;

import java.util.List;
import java.util.Map;

import com.galaxy.dto.ClassDto;
import com.galaxy.dto.SearchDto;

public interface ClassService {


    int selectCount(SearchDto dto) throws Exception;

    List<Map<String, Object>> selectList(SearchDto dto) throws Exception;

    Map<String, Object> getClassDetail(int seq) throws Exception;

    List<Map<String, Object>> selectClassOptionsForApply() throws Exception;


}