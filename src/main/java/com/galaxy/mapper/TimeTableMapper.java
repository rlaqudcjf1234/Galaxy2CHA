package com.galaxy.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.galaxy.dto.CalendarDto;
import com.galaxy.dto.SearchDto;
import com.galaxy.dto.SeqDto;


@Mapper
public interface TimeTableMapper {

    int selectCount(SearchDto dto) throws Exception;

    List<Map<String, Object>> tablelist(SeqDto dto) throws Exception;




}
