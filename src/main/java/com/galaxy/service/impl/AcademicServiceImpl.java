package com.galaxy.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.galaxy.mapper.AcademicMapper;
import com.galaxy.service.AcademicService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AcademicServiceImpl implements AcademicService {

    @Autowired
    private AcademicMapper academicMapper;

    @Override
    public void insertAcademic(Map<String, Object> params) {
        academicMapper.insertAcademic(params);
    }

    @Override
    public List<Map<String, Object>> readAcademic(int seq) {
        return academicMapper.readAcademic(seq);
    }

     @Override
    public List<Map<String, Object>> getAcademicInfo(int seq) {
        Map<String, Object> params = new HashMap<>();
        params.put("STUDENT_SEQ", seq);
        return academicMapper.getAcademicInfo(params);
    }

    @Override
    public void deleteAcademicInfo(Map<String, Object> params) {
        academicMapper.deleteAcademicInfo(params);
    }
}