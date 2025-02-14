package com.galaxy.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.galaxy.mapper.SlideMapper;
import com.galaxy.service.SlideService;

@Service
public class SlideServiceimpl implements SlideService {

    @Autowired
    SlideMapper slideMapper;

    public List<Map<String, Object>> slideList(String seq) throws Exception{

        return slideMapper.slideList(seq);
    }

}
