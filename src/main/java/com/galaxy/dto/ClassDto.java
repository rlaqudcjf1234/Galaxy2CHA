package com.galaxy.dto;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class ClassDto extends SeqDto {
    
    private String lecture;
    
    private String round;
    
    private String admin;

    private String room;

    private Date start_dt;

    private Date end_dt;

    private String start_tm;

    private String end_tm;

    private int people;

}
