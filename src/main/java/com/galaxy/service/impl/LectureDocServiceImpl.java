package com.galaxy.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.galaxy.mapper.LectureDocMapper;
import com.galaxy.service.LectureDocService;

@Service
public class LectureDocServiceImpl implements LectureDocService {

    @Autowired private LectureDocMapper lectureDocMapper;

    @Override public List<String> selectList(String lecture_seq, String division)throws Exception {
        return lectureDocMapper.selectList(lecture_seq, division);
    }
}
