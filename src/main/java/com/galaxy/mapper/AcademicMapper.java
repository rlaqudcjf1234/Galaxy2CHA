package com.galaxy.mapper;

import java.util.List;
import java.util.Map;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AcademicMapper {
    void insertAcademic(Map<String, Object> params);
    List<Map<String, Object>> readAcademic(int seq);
    List<Map<String, Object>> getAcademicInfo(Map<String, Object> params);
    void deleteAcademicInfo(Map<String, Object> params);
}