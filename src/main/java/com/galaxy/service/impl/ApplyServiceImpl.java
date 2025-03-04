package com.galaxy.service.impl;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

import org.springframework.stereotype.Service;
import org.springframework.validation.BeanPropertyBindingResult;
import org.springframework.validation.BindingResult;
import com.galaxy.dto.ApplyDto;
import com.galaxy.dto.SearchDto;
import com.galaxy.mapper.ApplyMapper;
import com.galaxy.service.ApplyService;
import com.galaxy.service.validator.ApplyValidator;

import jakarta.validation.ValidationException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ApplyServiceImpl implements ApplyService {

    private final ApplyMapper applyMapper;
    private final ApplyValidator applyValidator;

    @Override
    public int selectCount(ApplyDto dto) throws Exception {
        return applyMapper.selectCount(dto);
    }

    @Override
    public List<Map<String, Object>> selectList(ApplyDto dto) throws Exception {
        return applyMapper.selectList(dto);
    }

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
            throw e;
        } catch (Exception e) {
            e.printStackTrace();
            throw new ValidationException("처리 중 오류가 발생했습니다: " + e.getMessage());
        }
    }

    @Override
    public Map<String, Object> getApplyRead(String seq) {
        return applyMapper.selectApplyRead(seq);
    }

    @Override
    public int deleteApply(Long id) {
        return applyMapper.deleteApply(id);
    }

    @Override
    public void updateStatus(Long id, String useYn) throws Exception {
        Map<String, Object> params = new HashMap<>();
        params.put("id", id);
        params.put("useYn", useYn);
        applyMapper.updateStatus(params);
    }

    @Override
    public void CreateStudent(Long id) throws Exception {
        try {
            // 1. SEQ_MANAGEMENT에 새 레코드 추가
            applyMapper.insertSeqManagement();

            // 2. APPLY 데이터 조회
            ApplyDto applyDto = applyMapper.selectApplyById(id);
            if (applyDto == null) {
                throw new Exception("신청 정보를 찾을 수 없습니다.");
            }

            // 3. STUDENT 테이블에 데이터 삽입
            applyMapper.insertStudent(applyDto);

            // 4. APPLY 상태 업데이트
            Map<String, Object> params = new HashMap<>();
            params.put("id", id);
            params.put("useYn", "Y");
            applyMapper.updateApplyStatus(params);

        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception("학생 정보 저장 중 오류가 발생했습니다: " + e.getMessage());
        }
    }
}
