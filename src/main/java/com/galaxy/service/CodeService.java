package com.galaxy.service;

import java.util.List;
import java.util.Map;

import com.galaxy.dto.CodeDto;
import com.galaxy.dto.SearchDto;

public interface CodeService {

    List<Map<String, Object>> selectUseCode(int code_id) throws Exception;

    List<Map<String, Object>> selectUse1() throws Exception;

    List<Map<String, Object>> selectUse2() throws Exception;

    List<Map<String, Object>> selectUse10() throws Exception;

    List<Map<String, Object>> selectUse14() throws Exception;

    List<Map<String, Object>> selectUse15() throws Exception;

    List<Map<String, Object>> selectGroupList(SearchDto dto) throws Exception;

    int selectCount(SearchDto dto) throws Exception;

    int insertCode(CodeDto dto) throws Exception;

    Long updateCode(CodeDto dto) throws Exception;

    Map<String, Object> readCode(String group_id) throws Exception;
}
