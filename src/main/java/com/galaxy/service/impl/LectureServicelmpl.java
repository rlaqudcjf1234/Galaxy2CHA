package com.galaxy.service.impl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.galaxy.mapper.LectureMapper;
import com.galaxy.service.LectureService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class LectureServicelmpl implements LectureService {

    @Autowired
    LectureMapper lectureMapper;

    @Override
    public Map<String, Object> selectOne(String seq) throws Exception {
        return lectureMapper.selectOne(seq);
    }

   

}
