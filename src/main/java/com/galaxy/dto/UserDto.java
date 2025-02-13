package com.galaxy.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDto extends SeqDto {
    
    @Email
	@NotNull
	@NotBlank
    private String email;
	
	@NotNull
	@NotBlank
	private String password;

}
