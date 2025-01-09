package com.admin.service.impl;

import java.util.List;
import java.util.Map;

import com.admin.service.AdminVO;
import com.cmmn.service.SearchVO;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper("adminMapper")
public interface AdminMapper {

	int selectCount(SearchVO searchVO);

	List<Map<String, Object>> selectList(SearchVO searchVO);

	int selectCheck(String email);

	void insertAdmin(AdminVO adminVO);

}
