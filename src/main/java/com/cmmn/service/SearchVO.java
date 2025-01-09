package com.cmmn.service;

import javax.validation.constraints.NotNull;

import org.springmodules.validation.bean.conf.loader.annotation.handler.Email;

public class SearchVO extends PageVO {

	@Email
	@NotNull
	private String email;

	@NotNull
	private String name;

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
}
