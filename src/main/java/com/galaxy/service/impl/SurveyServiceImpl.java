package com.galaxy.service.impl;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.galaxy.dto.QuestionDto;
import com.galaxy.dto.QuestionResultDto;
import com.galaxy.dto.SearchDto;
import com.galaxy.mapper.SurveyItemMapper;
import com.galaxy.mapper.SurveyMapper;
import com.galaxy.service.SurveyService;

@Service
public class SurveyServiceImpl implements SurveyService {

    @Autowired
    private SurveyMapper surveyMapper;

    @Autowired
    private SurveyItemMapper surveyItemMapper;

    @Override
    public int selectCount(SearchDto dto) throws Exception {
        return surveyMapper.selectCount(dto);
    }

    @Override
    public List<Map<String, Object>> selectList(SearchDto dto) throws Exception {
        return surveyMapper.selectList(dto);
    }

    @Override
    public Map<String, Object> selectOne(String question_seq) throws Exception {
        Map<String, Object> map = surveyMapper.selectOne(question_seq);
        List<Map<String, Object>> list = surveyItemMapper.selectList(question_seq);

        if (list != null) {
            int[] iCounts = new int[list.size()];
            for (int i = 0; i < list.size(); i++) {
                Map<String, Object> qsItems = list.get(i);

                String item = (String) qsItems.get("ITEM");
                if (item != null && !item.isEmpty()) {
                    String[] items = item.split("\\|");

                    qsItems.put("ITEMS", items);
                    iCounts[i] = items.length;
                } else {
                    qsItems.put("ITEMS", new String[1]);
                    iCounts[i] = 1;
                }

                String result = (String) qsItems.get("RESULT");
                if (result != null && !result.isEmpty()) {
                    String[] results = result.split("\\|");

                    qsItems.put("RESULTS", results);
                } else {
                    qsItems.put("RESULTS", new String[1]);
                }
            }

            map.put("qsItems", list);
            map.put("iCounts", iCounts);
        }

        return map;
    }

    @Override
    @Transactional
    public void insertOne(QuestionDto dto) throws Exception {

        String seq = dto.getSeq();
        // surveyMapper.deleteOne(seq);
        int i = surveyMapper.insertOne(seq);

        if (i > 0) {
            surveyItemMapper.deleteList(seq);
            for (QuestionResultDto qsResults : dto.getQsResults()) {
                qsResults.setQuestion_seq(seq);

                String[] results = qsResults.getResults();
                if (results != null && results.length > 0) {
                    qsResults.setResult(String.join("|", results));
                } else {
                    qsResults.setResult("");
                }
                surveyItemMapper.insertOne(qsResults);
            }
        }
    }

}
