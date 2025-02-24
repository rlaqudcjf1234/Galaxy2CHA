package com.galaxy.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class QuestionDto extends SeqDto {

    private QuestionResultDto[] qsResults;
}
