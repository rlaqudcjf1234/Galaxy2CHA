package com.galaxy.service;

import java.util.List;
import java.util.Map;

import com.galaxy.dto.SearchDto;
import com.galaxy.dto.SeqDto;

public interface TimeTableService {

    int selectCount(SearchDto dto)throws Exception;

    List<Map<String, Object>> tablelist(SeqDto dto)throws Exception;

}
