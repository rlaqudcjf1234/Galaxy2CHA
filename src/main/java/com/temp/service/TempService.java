package com.temp.service;

import java.util.List;
import java.util.Map;

import com.cmmn.service.SearchVO;

public interface TempService {

	int selectCheck() throws Exception;

	int selectCount(SearchVO vo) throws Exception;

	List<Map<String, Object>> selectList(SearchVO vo) throws Exception;

}
