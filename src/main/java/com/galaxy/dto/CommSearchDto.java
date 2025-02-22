package com.galaxy.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommSearchDto extends SearchDto{
    private String searchKeyword; // 검색어 (제목, 내용 검색용)
    private String tableType = "STUDENT"; // 기본값을 STUDENT로 설정
    private Long classSeq;
    private String division;
}
