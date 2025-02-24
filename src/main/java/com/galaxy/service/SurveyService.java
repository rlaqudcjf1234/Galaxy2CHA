package com.galaxy.service;

import java.util.List;
import java.util.Map;
import com.galaxy.dto.QuestionDto;
import com.galaxy.dto.SearchDto;

public interface SurveyService {

    int selectCount(SearchDto dto) throws Exception;

    List<Map<String, Object>> selectList(SearchDto dto) throws Exception;

    Map<String, Object> selectOne(String question_seq) throws Exception;

    void insertOne(QuestionDto dto) throws Exception;

}
