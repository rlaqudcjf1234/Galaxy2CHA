package com.temp.service.impl;

import java.util.List;
import java.util.Map;

import com.cmmn.service.SearchVO;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper("tempMapper")
public interface TempMapper {

	int selectCheck() throws Exception;

	int selectCount(SearchVO vo) throws Exception;

	List<Map<String, Object>> selectList(SearchVO vo) throws Exception;

}
