package com.galaxy.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.galaxy.dto.LectureDto;
import com.galaxy.dto.SearchDto;

@Mapper
public interface LectureMapper {

    int selectCount(SearchDto dto) throws Exception;
        
    int insertLecture(LectureDto dto) throws Exception;
    
    List<Map<String, Object>> selectList(SearchDto dto) throws Exception;

    Map<String, Object> selectLectureRead(String seq) throws Exception;

    Long updateLecture(LectureDto dto) throws Exception;

    Map<String, Object> selectOne(String seq)throws Exception;

    List<Map<String, Object>> selectLectureList() throws Exception;
}
