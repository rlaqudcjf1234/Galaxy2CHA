package com.galaxy.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.galaxy.dto.LectureDto;
import com.galaxy.dto.ListDto;
import com.galaxy.dto.SearchDto;
import com.galaxy.service.LectureService;

import jakarta.validation.Valid;
import jakarta.validation.ValidationException;

@RestController
@RequestMapping(value = "/lecture")
public class LectureController {

    @Autowired
    private LectureService lectureService;

    @GetMapping("/list")
    public ListDto list(SearchDto dto) throws Exception {

        int count = lectureService.selectCount(dto);
        List<Map<String, Object>> list = lectureService.selectList(dto);

        ListDto listDto = new ListDto(count, list);

        return listDto;
    }

    @PostMapping("/add")
    public ResponseEntity<Map<String, Object>> insert(@Valid @RequestBody LectureDto dto) throws Exception {
        Map<String, Object> response = new HashMap<>();

        try {
            int result = lectureService.insertLecture(dto);

            if (result > 0) {
                response.put("status", "success");
                response.put("message", "강의가 성공적으로 등록되었습니다.");
                return ResponseEntity.ok(response);
            } else {
                response.put("status", "fail");
                response.put("message", "강의 등록에 실패했습니다.");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }
        } catch (Exception e) {
            response.put("status", "error");
            response.put("message", "강의 등록 중 오류가 발생했습니다.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/read")
    public ResponseEntity<?> getLectureRead(
            @RequestParam(name = "seq") String seq) throws Exception {
        try {
            Map<String, Object> lecture = lectureService.getLectureRead(seq);
            if (lecture == null) {
                return ResponseEntity
                        .notFound()
                        .build();
            }
            return ResponseEntity.ok(lecture);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("강의 상세 정보 조회 중 오류가 발생했습니다.");
        }
    }

    // 강의 정보 조회

    @GetMapping("/mod")
    public Map<String, Object> mod(@RequestParam(name = "seq") String seq) throws Exception {
        Map<String, Object> map = lectureService.selectOne(seq);

        return map;
    }

    // 강의 정보 수정
    @PostMapping("/mod")
    public ResponseEntity<Map<String, Object>> mod(@Valid @RequestBody LectureDto dto) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            lectureService.updateLecture(dto);
            response.put("status", "success");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("status", "error");
            response.put("message", "강의 수정 중 오류가 발생했습니다.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Map<String, Object>> deleteLecture(
            @RequestParam(name = "seq") Long seq) {
        Map<String, Object> response = new HashMap<>();

        try {
            System.out.println("Received delete request for seq: " + seq); // 로깅 추가
            Long result = lectureService.deleteLecture(seq);
            System.out.println("Delete result: " + result); // 로깅 추가

            if (result > 0) {
                response.put("status", "success");
                response.put("message", "강의가 성공적으로 삭제되었습니다.");
                return ResponseEntity.ok(response);
            } else {
                response.put("status", "fail");
                response.put("message", "강의 삭제에 실패했습니다.");
                return ResponseEntity.badRequest().body(response);
            }
        } catch (Exception e) {
            System.out.println("Error during deletion: " + e.getMessage()); // 로깅 추가
            response.put("status", "error");
            response.put("message", "강의 삭제 중 오류가 발생했습니다.: " + e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }

     // 사용 가능한 강의 목록 조회(이재욱)
     @GetMapping("/use")
public ResponseEntity<?> use() throws Exception {
    try {
        List<Map<String, Object>> list = lectureService.selectLectureList();
        return ResponseEntity.ok(list);
    } catch (Exception e) {
        // 예외 로깅
        e.printStackTrace();
        return ResponseEntity
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body("강의 목록 조회 중 오류가 발생했습니다: " + e.getMessage());
    }
}

}