package com.galaxy.service;

import java.util.List;
import java.util.Map;

public interface AcademicService {
    void insertAcademic(Map<String, Object> params);
    List<Map<String, Object>> readAcademic(int seq);

    List<Map<String, Object>> getAcademicInfo(int seq);
    void deleteAcademicInfo(Map<String, Object> params);
}