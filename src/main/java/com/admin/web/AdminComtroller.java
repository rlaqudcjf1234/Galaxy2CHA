package com.admin.web;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.validation.Valid;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.admin.service.AdminService;
import com.admin.service.AdminVO;
import com.cmmn.service.SearchVO;

import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;

@Controller
@RequestMapping(value = "/admin")
public class AdminComtroller {

	@Resource(name = "adminService")
	AdminService adminService;
	
	@RequestMapping(value = "/list.do", method = RequestMethod.GET)
	public String list(@ModelAttribute SearchVO searchVO, Model model) throws Exception {
		
		List<Map<String, Object>> list = adminService.selectList(searchVO);
		model.addAttribute("list", list);
		
		int count = adminService.selectCount(searchVO);
		PaginationInfo page = searchVO.getPagination();
		page.setTotalRecordCount(count);
		model.addAttribute("page", page);
		
		return "admin/list.tiles";
	}
	
	@RequestMapping(value = "/add.do", method = RequestMethod.GET)
	public String add(@ModelAttribute SearchVO searchVO, @ModelAttribute AdminVO adminVO, Model model) throws Exception {
		
		return "admin/add.tiles";
	}

	@ResponseBody
	@RequestMapping(value = "/check.do", method = RequestMethod.POST)
	public int check(@RequestBody String email) throws Exception {
		// TODO Auto-generated method stub
		return adminService.selectCheck(email);
	}
	
	@ResponseBody
	@RequestMapping(value = "/add.do", method = RequestMethod.POST)
	public int add(@Valid @RequestBody AdminVO adminVO) throws Exception {
		// TODO Auto-generated method stub
		adminService.insertAdmin(adminVO);

		return 0;
	}

}
