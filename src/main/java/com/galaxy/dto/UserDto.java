package com.galaxy.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDto extends SeqDto {

	private String class_seq;

	private String name;

    private String email;
	
    private String id;

	private String password;

}
