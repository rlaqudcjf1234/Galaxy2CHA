package com.galaxy.service;

import java.util.List;
import java.util.Map;

import com.galaxy.dto.AdminDto;
import com.galaxy.dto.LectureDto;
import com.galaxy.dto.SearchDto;

import jakarta.validation.Valid;


public interface LectureService {
        
    int selectCount(SearchDto dto) throws Exception;
    
    List<Map<String, Object>> selectList(SearchDto dto) throws Exception;
    
    int insertLecture(LectureDto dto) throws Exception;

    Map<String, Object> getLectureRead(String seq) throws Exception;

    Long updateLecture(LectureDto dto) throws Exception;
    
    Long deleteLecture(Long seq) throws Exception;

    List<Map<String, Object>> selectLectureList() throws Exception;
    
    Map<String, Object> selectOne(String seq)throws Exception;
}
