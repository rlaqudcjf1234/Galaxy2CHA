package com.galaxy.controller;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.galaxy.dto.ApplyDto;
import com.galaxy.mapper.ApplyMapper;
import com.galaxy.service.ApplyService;
import com.galaxy.service.JwtService;
import com.galaxy.service.validator.ApplyValidator;
import com.galaxy.dto.ListDto;
import com.galaxy.dto.SearchDto;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.ValidationException;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/apply")
public class ApplyController {

    private final ApplyValidator applyValidator;
    private final ApplyMapper applyMapper;

    @Autowired
    private ApplyService applyService;

    @Autowired
    private JwtService jwtService;

    @InitBinder
    public void validatorBinder(WebDataBinder binder) {
        binder.addValidators(applyValidator);
    }

    @PostMapping("/guest")
    public ResponseEntity<?> guest(HttpServletRequest request, HttpServletResponse response,
            ApplyDto applyDto) {
        try {
            int count = applyService.selectCount(applyDto);

            if (count == 0) {
                System.out.println("No apply info found for: " + applyDto); // 로그 추가
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("신청 정보를 찾을 수 없습니다.");
            }

            // 임시 토큰 발행
            String jwt = jwtService.generateGuestToken(applyDto.getEmail(), applyDto.getName(),
                    applyDto.getJumin());

            // 임시 토큰 저장
            jwtService.setAccessToken(response, jwt);
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            System.err.println("Invalid argument: " + e.getMessage()); // 로그 추가
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            System.err.println("Unexpected error in getStudentApplyInfo: " + e.getMessage()); // 로그
                                                                                              // 추가
            e.printStackTrace(); // 스택 트레이스 출력
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("서버 오류가 발생했습니다: " + e.getMessage());
        }
    }

    @GetMapping("/list")
    public ListDto list(ApplyDto dto) throws Exception {

        int count = applyService.selectCount(dto);
        List<Map<String, Object>> list = applyService.selectList(dto);

        return new ListDto(count, list);
    }

    @PostMapping("/add")
    public ResponseEntity<Map<String, String>> add(@RequestBody ApplyDto dto) {
        try {
            applyService.insertApply(dto);
            return ResponseEntity.ok(Collections.singletonMap("message", "신청이 완료되었습니다."));
        } catch (ValidationException e) {
            System.err.println("Validation Error: " + e.getMessage());
            return ResponseEntity.badRequest()
                    .body(Collections.singletonMap("message", e.getMessage()));
        } catch (Exception e) {
            System.err.println("Unexpected Error: " + e.getMessage());
            return ResponseEntity.internalServerError()
                    .body(Collections.singletonMap("message", "처리 중 오류가 발생했습니다."));
        }
    }

    @GetMapping("/read/{id}")
    public ResponseEntity<Map<String, Object>> read(@PathVariable("id") String id) {
        try {
            Map<String, Object> apply = applyMapper.selectApplyRead(id);
            if (apply == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(apply);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteApply(@PathVariable("id") Long id) { // 명시적으로 "id" 지정
        try {
            int result = applyService.deleteApply(id);
            if (result > 0) {
                return ResponseEntity.ok().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
