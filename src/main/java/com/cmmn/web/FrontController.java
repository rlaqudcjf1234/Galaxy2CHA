package com.cmmn.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class FrontController {

	@RequestMapping(value = { "/front/{page}" }, method = RequestMethod.GET)
	public String page(@PathVariable String page) throws Exception {
		// TODO Auto-generated method stub

		return "/front/" + page;
	}

	@RequestMapping(value = { "/front/{path}/{page}" }, method = RequestMethod.GET)
	public String page(@PathVariable String path, @PathVariable String page) throws Exception {
		// TODO Auto-generated method stub

		return "/front/" + path + "/" + page;
	}

	@RequestMapping(value = { "/front/{path1}/{path2}/{page}" }, method = RequestMethod.GET)
	public String page(@PathVariable String path1, @PathVariable String path2, @PathVariable String page) throws Exception {
		// TODO Auto-generated method stub

		return "/front/" + path1 + "/" + path2 + "/" + page;
	}

}
