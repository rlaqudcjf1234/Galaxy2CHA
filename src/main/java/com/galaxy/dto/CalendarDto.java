package com.galaxy.dto;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class CalendarDto extends SeqDto {
    
    private Long class_seq;

    private Date daily;

    private Long student_seq;

    private String division;

    private String memo;
    
}
