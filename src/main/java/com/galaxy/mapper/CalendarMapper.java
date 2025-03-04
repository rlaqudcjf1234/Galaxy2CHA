package com.galaxy.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.galaxy.dto.SearchDto;
import com.galaxy.dto.CalendarDto;

@Mapper
public interface CalendarMapper {
    
    int selectCount(SearchDto dto)throws Exception;

    List<Map<String, Object>> stdCalenList(SearchDto dto)throws Exception;

    List<Map<String, Object>> classStudentList(String room) throws Exception;

    int insertstd(CalendarDto dto) throws Exception;
    
    int updatestd(Map<String, Object> params);

    Map<String, Object> getStudentClassInfo(SearchDto dto) throws Exception;
}
