package com.galaxy.service;

import java.util.List;
import java.util.Map;

import com.galaxy.dto.CalendarDto;
import com.galaxy.dto.SearchDto;

public interface CalendarService {
    
    int selectCount(SearchDto dto) throws Exception;
    
    List<Map<String, Object>> stdCalenList(SearchDto dto) throws Exception;

    List<Map<String, Object>> classStudentList(String room) throws Exception;
    
    int insertstd(CalendarDto dto) throws Exception;
    
    int updatestd(Map<String, Object> params);

    Map<String, Object> getStudentClassInfo(SearchDto dto) throws Exception;
}