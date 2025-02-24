package com.galaxy.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.galaxy.dto.ClassDto;
import com.galaxy.dto.SearchDto;
import com.galaxy.mapper.ClassMapper;
import com.galaxy.service.ClassService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class ClassServiceImpl implements ClassService{

	protected final String table_nm = "class";
   
	@Autowired
    ClassMapper classMapper;
    
    @Override
	public List<Map<String, Object>> selectList(SearchDto dto) throws Exception {
		return classMapper.selectList(dto);
	}

    @Override
    public Map<String, Object> getClassDetail(int seq) throws Exception {
        try {
            return classMapper.classDetail(seq);
        } catch (Exception e) {
            throw new Exception("강의 상세 조회 중 오류가 발생했습니다.");
        }
    }

    @Override
	public int selectCount(SearchDto dto) throws Exception {
		return classMapper.selectCount(dto);
	}

    
    @Override
    public List<Map<String, Object>> selectClassOptionsForApply() throws Exception {
        return classMapper.selectClassOptionsForApply();
    }

   
}
