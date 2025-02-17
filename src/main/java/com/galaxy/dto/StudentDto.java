package com.galaxy.dto;

import java.sql.Date;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter; 

@Getter
@Setter
@NoArgsConstructor
public class StudentDto {
    private String id;
    private int classSeq;
    private String jumin; // 주민번호 전체 저장
    private String name;
    private String realZipcode;
    private String realAddress1;
    private String realAddress2;
    private String zipcode;
    private String address1;
    private String address2;
    private String email;
    private String phone;
    private String path;
    private String password;
    private Date regDate;

    // 생년월일을 변환하는 메서드 추가
    public String getFormattedBirth() {
        if (jumin == null || jumin.length() < 6) {
            return "알 수 없음"; // JUMIN이 없을 경우
        }
        String yearPrefix = (jumin.charAt(6) == '1' || jumin.charAt(6) == '2') ? "19" : "20";
        String year = yearPrefix + jumin.substring(0, 2);
        String month = jumin.substring(2, 4);
        String day = jumin.substring(4, 6);
        return String.format("%s년 %s월 %s일", year, month, day);
    }
}


