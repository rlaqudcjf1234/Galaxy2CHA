package com.galaxy.service.validator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import com.galaxy.dto.ApplyDto;
import com.galaxy.mapper.ApplyMapper;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class ApplyValidator extends AbstractValidator<ApplyDto> {

    @Autowired
    ApplyMapper applyMapper;

    @Override
    protected void doValidate(ApplyDto dto, Errors errors) {
        try {
            System.out.println("Validating DTO: " + dto);

            // 필수값 검증을 먼저 수행
            validateRequiredField(dto.getJumin(), "jumin", "주민등록번호", errors);
            validateRequiredField(dto.getName(), "name", "이름", errors);
            validateRequiredField(dto.getReal_zipcode(), "real_zipcode", "실거주 우편번호", errors);
            validateRequiredField(dto.getReal_address1(), "real_address1", "실거주 주소", errors);
            validateRequiredField(dto.getReal_address2(), "real_address2", "실거주 주소 상세", errors);
            validateRequiredField(dto.getEmail(), "email", "이메일", errors);
            validateRequiredField(dto.getPhone(), "phone", "전화번호", errors);
            validateRequiredField(dto.getPath(), "path", "지원경로", errors);

            // use_yn이 'N'인 경우에만 중복 체크 수행
            if (!errors.hasFieldErrors("jumin") && applyMapper.selectActiveByJumin(dto.getJumin()) > 0) {
                System.out.println("Duplicate active jumin found: " + dto.getJumin());
                errors.rejectValue("jumin", "duplicate.jumin", "이미 등록된 주민등록번호입니다.");
            }
            
            if (!errors.hasFieldErrors("phone") && applyMapper.selectActiveByPhone(dto.getPhone()) > 0) {
                System.out.println("Duplicate active phone found: " + dto.getPhone());
                errors.rejectValue("phone", "duplicate.phone", "이미 등록된 전화번호입니다.");
            }
            
        } catch (Exception e) {
            System.out.println("Validation error occurred: " + e.getClass().getName());
            System.out.println("Error message: " + e.getMessage());
            e.printStackTrace();
            errors.reject("validation.error", "처리 중 오류가 발생했습니다: " + e.getMessage());
        }

        if (errors.hasErrors()) {
            System.out.println("Validation errors found:");
            errors.getAllErrors().forEach(error -> 
                System.out.println(error.getCode() + ": " + error.getDefaultMessage())
            );
        }
    }

    private void validateRequiredField(String value, String fieldName, String fieldLabel, Errors errors) {
        if (value == null || value.trim().isEmpty()) {
            System.out.println("Required field missing - " + fieldName + ": " + fieldLabel);
            errors.rejectValue(fieldName, "required." + fieldName, fieldLabel + " 필수 입력값입니다.");
        }
    }
}