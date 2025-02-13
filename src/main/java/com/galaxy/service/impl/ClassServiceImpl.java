package com.galaxy.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.galaxy.dto.ClassDto;
import com.galaxy.dto.SearchDto;
import com.galaxy.mapper.ClassMapper;
import com.galaxy.service.ClassService;

@Service
public class ClassServiceImpl implements ClassService{

	protected final String table_nm = "class";
   
	@Autowired
    ClassMapper classMapper;
    
    @Override
	public List<Map<String, Object>> selectList(SearchDto dto) throws Exception {
		return classMapper.selectList(dto);
	}

    @Override
	public int selectCount(SearchDto dto) throws Exception {
		return classMapper.selectCount(dto);
	}

	

	@Override
    public int insertClass(ClassDto dto) throws Exception {
		dto.setTable_nm(table_nm);
        return classMapper.insertClass(dto);
    }

	

	@Override
    public Map<String, Object> getClassDetail(String seq) throws Exception {
        // 1. 기본 유효성 검사
        if (seq == null || seq.trim().isEmpty()) {
            throw new IllegalArgumentException("seq는 필수 값입니다.");
        }

        // 2. 클래스 기본 정보 조회
        Map<String, Object> classDetail = classMapper.selectClassDetail(seq);

        return classDetail;
    }
    
    @Override
    public List<Map<String, Object>> selectClassOptionsForApply() throws Exception {
        return classMapper.selectClassOptionsForApply();
    }
}
