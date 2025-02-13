package com.galaxy.dto;

import java.sql.Date;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminDto extends SeqDto {

	@Email
	@NotNull
	@NotBlank
	private String email;
	
	private String password;
	
	private String password2;

	private String name;
	
	private String phone;
	
	private String division;
	
	private String post;
	
	private Date reg_dt;
	
	private String use_yn;

	private String uri;

	private String method;
	
}
