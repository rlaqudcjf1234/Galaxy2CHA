package com.galaxy.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.BeanPropertyBindingResult;
import org.springframework.validation.BindingResult;
import com.galaxy.dto.ApplyDto;
import com.galaxy.dto.SearchDto;
import com.galaxy.mapper.ApplyMapper;
import com.galaxy.service.ApplyService;
import com.galaxy.service.validator.ApplyValidator;

import jakarta.validation.ValidationException;

//@Transactional
@Service
public class ApplyServiceImpl implements ApplyService {

    @Autowired
    ApplyMapper applyMapper;

    @Autowired
    ApplyValidator applyValidator;

    public ApplyServiceImpl(ApplyMapper applyMapper, ApplyValidator applyValidator) {
        this.applyMapper = applyMapper;
        this.applyValidator = applyValidator;
    }

    @Override
    public int selectCount(SearchDto dto) throws Exception {
        return applyMapper.selectCount(dto);
    }

    @Override
    public List<Map<String, Object>> selectList(SearchDto dto) throws Exception {
        return applyMapper.selectList(dto);
    }

    // 신청서를 저장하는 메서드
    @Override
    public void insertApply(ApplyDto dto) throws Exception {
        try {
            if (dto == null || dto.getClass_seq() == null || dto.getClass_seq() <= 0) {
                throw new ValidationException("클래스를 선택해주세요.");
            }

            BindingResult bindingResult = new BeanPropertyBindingResult(dto, "applyDto");
            applyValidator.validate(dto, bindingResult);

            if (bindingResult.hasErrors()) {
                String errorMessage = bindingResult.getAllErrors().get(0).getDefaultMessage();
                throw new ValidationException(errorMessage != null ? errorMessage : "유효성 검사 오류");
            }

            applyMapper.insertApply(dto);
        } catch (ValidationException e) {
            throw e;  // 기존 ValidationException은 그대로 전파
        } catch (Exception e) {
            e.printStackTrace();
            throw new ValidationException("처리 중 오류가 발생했습니다: " + e.getMessage());
        }
    }

    @Override
    public Map<String, Object> getApplyRead(String seq) {
        return applyMapper.selectApplyRead(seq);
    }

    public int deleteApply(Long id) {
        return applyMapper.deleteApply(id);
    }

    //학생 등록 정보 개별 조회
    @Override
    public ApplyDto getStudentApplyInfo(String name, String email, String jumin) {
        // 입력값 유효성 검사
        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("이름은 필수 입력값입니다.");
        }
        if (email == null || email.trim().isEmpty()) {
            throw new IllegalArgumentException("이메일은은 필수 입력값입니다.");
        }
        if (jumin == null || jumin.trim().isEmpty()) {
            throw new IllegalArgumentException("주민번호는 필수 입력값입니다.");
        }

        return applyMapper.selectApplyByStudentInfo(name, email, jumin);
    }
}