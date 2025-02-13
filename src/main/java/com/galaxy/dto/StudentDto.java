package com.galaxy.dto;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StudentDto {
    
    private String jumin;
    
    private String name;
    
    private String real_zipcode;
    
    private String real_address1;
    
    private String real_address2;
    
    private String zipcode;
    
    private String adress1;
    
    private String adress2;
    
    private String email;
    
    private String phone;

    private String path;
    
    private String id;
    
    private String password;

    private Date reg_date;

  // 생성자: Map을 받아 DTO 객체를 초기화
  public StudentDto(Map<String, Object> data) {
    this.jumin = (String) data.get("jumin");
    this.name = (String) data.get("name");
    this.real_zipcode = (String) data.get("real_zipcode");
    this.real_address1 = (String) data.get("real_address1");
    this.real_address2 = (String) data.get("real_address2");
    this.zipcode = (String) data.get("zipcode");
    this.adress1 = (String) data.get("adress1");
    this.adress2 = (String) data.get("adress2");
    this.email = (String) data.get("email");
    this.phone = (String) data.get("phone");
    this.path = (String) data.get("path");
    this.id = (String) data.get("id");
    this.password = (String) data.get("password");
    this.reg_date = (Date) data.get("reg_date");
}

   // List<Map<String, Object>>를 List<StudentDto>로 변환하는 메서드
    public static List<StudentDto> fromList(List<Map<String, Object>> list) {
        List<StudentDto> studentDtos = new ArrayList<>();
        for (Map<String, Object> data : list) {
            studentDtos.add(new StudentDto(data));
        }
        return studentDtos;
    }

}
