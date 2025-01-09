package com.temp.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.cmmn.service.SearchVO;
import com.temp.service.TempService;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

@Service("tempService")
public class TempServiceImpl extends EgovAbstractServiceImpl implements TempService {

	@Resource(name = "tempMapper")
	TempMapper tempMapper;

	@Override
	public int selectCheck() throws Exception {
		// TODO Auto-generated method stub
		return tempMapper.selectCheck();
	}

	@Override
	public int selectCount(SearchVO vo) throws Exception {
		// TODO Auto-generated method stub
		return tempMapper.selectCount(vo);
	}

	@Override
	public List<Map<String, Object>> selectList(SearchVO vo) throws Exception {
		// TODO Auto-generated method stub
		return tempMapper.selectList(vo);
	}

}
