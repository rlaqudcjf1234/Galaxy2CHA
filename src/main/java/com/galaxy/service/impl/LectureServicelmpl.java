package com.galaxy.service.impl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.galaxy.mapper.LectureMapper;
import com.galaxy.service.LectureService;

@Service
public class LectureServicelmpl implements LectureService {

    @Autowired LectureMapper lectureMapper;

    @Override public Map<String, Object> selectOne(String seq)throws Exception {
        return lectureMapper.selectOne(seq);
    }
}
