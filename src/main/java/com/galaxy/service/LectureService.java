package com.galaxy.service;

import java.util.Map;

public interface LectureService {
    
    Map<String, Object> selectOne(String seq)throws Exception;

}
