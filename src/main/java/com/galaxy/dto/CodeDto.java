package com.galaxy.dto;

import java.sql.Date;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CodeDto {

    private String name;

    private Object value;

    public CodeDto(String name, Object value) {
        this.name = name;
        this.value = value;
    }

    private Long group_id;

    private String group_name; 

    private Long group_sort;

    private Date reg_dt;
    
    private Long use_yn;
}
