package com.admin.service;

import java.util.List;
import java.util.Map;

import com.cmmn.service.SearchVO;

public interface AdminService {

	int selectCount(SearchVO searchVO);

	List<Map<String, Object>> selectList(SearchVO searchVO);

	int selectCheck(String email);
	
	void insertAdmin(AdminVO adminVO);

}
