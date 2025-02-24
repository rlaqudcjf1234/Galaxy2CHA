package com.galaxy.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QuestionResultDto {

    private String question_seq;

    private Long sort;

    private String[] results;

    private String result;
}
