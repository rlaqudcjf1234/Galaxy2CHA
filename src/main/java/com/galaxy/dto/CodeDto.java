package com.galaxy.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CodeDto {

    private String name;

    private Object value;

    public CodeDto(String name, Object value) {
        this.name = name;
        this.value = value;
    }

}
