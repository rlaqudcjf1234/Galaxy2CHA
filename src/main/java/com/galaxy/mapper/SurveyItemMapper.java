package com.galaxy.mapper;

import java.util.List;
import java.util.Map;
import org.apache.ibatis.annotations.Mapper;
import com.galaxy.dto.QuestionResultDto;

@Mapper
public interface SurveyItemMapper {

    List<Map<String, Object>> selectList(String question_seq) throws Exception;

    void deleteList(String question_seq) throws Exception;

    void insertOne(QuestionResultDto qsItems) throws Exception;

}
