package com.galaxy.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommPostDto {
    private String tableType;
    private Long authorSeq;
    private Long classSeq;
    private Long studentSeq;
    private String title;      // 제목
    private String division;   // 구분
    private String detail;     // 상세
    // regDt는 서버에서 생성되므로 제외
    // seq는 자동 생성되므로 제외
}
