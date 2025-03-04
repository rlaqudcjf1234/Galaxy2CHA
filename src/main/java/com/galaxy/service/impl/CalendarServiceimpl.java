package com.galaxy.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.galaxy.dto.CalendarDto;
import com.galaxy.dto.SearchDto;
import com.galaxy.mapper.CalendarMapper;
import com.galaxy.service.CalendarService;

@Service
public class CalendarServiceimpl implements CalendarService {
    
    protected final String table_nm = "calendar";
    
    @Autowired
    CalendarMapper calendarMapper;
    
    @Override
    public int selectCount(SearchDto dto) throws Exception {
        return calendarMapper.selectCount(dto);
    }
    
    @Override
    public List<Map<String, Object>> stdCalenList(SearchDto dto) throws Exception {
        return calendarMapper.stdCalenList(dto);
    }

    @Override
    public List<Map<String, Object>> classStudentList(String room) throws Exception {
        return calendarMapper.classStudentList(room);
    }
    
    @Override
    public int insertstd(CalendarDto dto) throws Exception {
        // 로깅 추가
        System.out.println("=== Insert Calendar Parameters ===");
        System.out.println("CLASS_SEQ: " + dto.getClass_seq());
        System.out.println("DAILY: " + dto.getDaily());
        System.out.println("STUDENT_SEQ: " + dto.getStudent_seq());
        System.out.println("DIVISION: " + dto.getDivision());
        System.out.println("MEMO: " + dto.getMemo());
        
        return calendarMapper.insertstd(dto);
    }
    
    @Override
    public int updatestd(Map<String, Object> params) {
        try {
            // 디버깅을 위한 로그 추가
            System.out.println("=== Update Parameters ===");
            System.out.println("DAILY: " + params.get("daily"));
            System.out.println("CLASS_SEQ: " + params.get("class_seq"));
            System.out.println("STUDENT_SEQ: " + params.get("student_seq"));
            System.out.println("DIVISION: " + params.get("division"));
            System.out.println("MEMO: " + params.get("memo"));
            
            // 실제 업데이트 실행
            int result = calendarMapper.updatestd(params);
            
            // 결과 로그
            System.out.println("Update result count: " + result);
            return result;
            
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to update student calendar: " + e.getMessage());
        }
    }

    public Map<String, Object> getStudentClassInfo(SearchDto dto) throws Exception {
        System.out.println("getStudentClassInfo() 호출됨: " + dto);
        
        Map<String, Object> classInfo = calendarMapper.getStudentClassInfo(dto);
        
        if (classInfo == null) {
            System.out.println("⚠️ 클래스 정보가 없습니다.");
        } else {
            System.out.println("📌 가져온 클래스 정보: " + classInfo);
        }
        
        return classInfo;
    }
}