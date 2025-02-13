package com.galaxy.dto;

import java.sql.Date;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ApplyDto extends SeqDto {
    private Long class_seq;

    @NotNull
    @NotBlank
    private String jumin; // 주민등록번호

    @NotNull
    @NotBlank
    private String name; // 이름

    @NotNull
    @NotBlank
    private String real_zipcode; // 실거주 우편번호

    @NotNull
    @NotBlank
    private String real_address1; // 실거주 주소

    @NotNull
    @NotBlank
    private String real_address2; // 실거주 주소 상세

    private String zipcode; // 우편번호

    private String address1; // 주소

    private String address2; // 주소 상세

    @Email
    @NotNull
    @NotBlank
    private String email; // 이메일

    @NotNull
    @NotBlank
    private String phone; // 전화번호

    @NotNull
    @NotBlank
    private String path; // 지원경로

    @NotNull
    private Date reg_dt; // 등록일자

    private Long id;
}