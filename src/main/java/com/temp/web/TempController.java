package com.temp.web;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.cmmn.service.SearchVO;
import com.temp.service.TempService;

@RestController
@RequestMapping(value = "/temp")
public class TempController {

	@Resource(name = "tempService")
	TempService tempService;

	@RequestMapping(value = "/selectCount.do", method = RequestMethod.POST)
	public int selectCount(SearchVO vo) throws Exception {
		// TODO Auto-generated method stub
		int count = tempService.selectCount(vo);

		return count;
	}

	@RequestMapping(value = "/selectList.do", method = RequestMethod.POST)
	public List<Map<String, Object>> selectList(SearchVO vo) throws Exception {
		// TODO Auto-generated method stub
		List<Map<String, Object>> list = tempService.selectList(vo);

		return list;
	}
	
}
