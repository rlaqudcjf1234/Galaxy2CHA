package com.admin.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.admin.service.AdminService;
import com.admin.service.AdminVO;
import com.cmmn.service.SearchVO;

@Service("adminService")
public class AdminServiceImpl implements AdminService {
	
	final protected String table_nm = "admin";

	@Resource(name = "adminMapper")
	AdminMapper adminMapper;

	@Override
	public int selectCount(SearchVO searchVO) {
		// TODO Auto-generated method stub
		return adminMapper.selectCount(searchVO);
	}

	@Override
	public List<Map<String, Object>> selectList(SearchVO searchVO) {
		// TODO Auto-generated method stub
		return adminMapper.selectList(searchVO);
	}

	@Override
	public int selectCheck(String email) {
		// TODO Auto-generated method stub
		return adminMapper.selectCheck(email);
	}

	@Override
	public void insertAdmin(AdminVO adminVO) {
		// TODO Auto-generated method stub
		adminMapper.insertAdmin(adminVO);
	}
	
}
