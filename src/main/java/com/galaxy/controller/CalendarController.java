package com.galaxy.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.galaxy.dto.CalendarDto;
import com.galaxy.dto.ListDto;
import com.galaxy.dto.SearchDto;
import com.galaxy.service.CalendarService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequestMapping(value = "calendar")
public class CalendarController {

    @Autowired
    private CalendarService calendarService;

    @GetMapping("/list")
    public ListDto stulist(
            @RequestParam(value = "year", required = false) Integer year,
            @RequestParam(value = "month", required = false) Integer month) throws Exception {
        SearchDto dto = new SearchDto();
        dto.setYear(year);
        dto.setMonth(month);

        // 파라미터 값 로깅 추가
        System.out.println("Year: " + year);
        System.out.println("Month: " + month);
        System.out.println("DTO Year: " + dto.getYear());
        System.out.println("DTO Month: " + dto.getMonth());

        int count = calendarService.selectCount(dto);
        List<Map<String, Object>> list = calendarService.stdCalenList(dto);

        // 결과 데이터 로깅 추가
        System.out.println("Result count: " + count);
        System.out.println("Result list size: " + list.size());

        return new ListDto(count, list);
    }

    @GetMapping("/stdlist")
    public ResponseEntity<?> getClassStudentList(
            @RequestParam(name = "room", required = false) String room) {
        try {
            if (room == null || room.isEmpty()) {
                return ResponseEntity.badRequest().body("Room parameter is required");
            }

            List<Map<String, Object>> studentList = calendarService.classStudentList(room);
            if (studentList == null || studentList.isEmpty()) {
                return ResponseEntity.ok(new ArrayList<>()); // 빈 리스트 반환
            }
            return ResponseEntity.ok(studentList);
        } catch (Exception e) {
            // 로깅 추가
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching student list: " + e.getMessage());
        }
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(CalendarDto dto) throws Exception {
        try {
            calendarService.insertstd(dto);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error adding calendar: " + e.getMessage());
        }
    }

    @PostMapping("/mod")
    public ResponseEntity<?> updateStd(@RequestParam Map<String, Object> params) {
        try {
            System.out.println("=== Controller Parameters ===");
            System.out.println(params);

            // 날짜 형식 검증
            if (!params.containsKey("daily") || params.get("daily") == null) {
                return ResponseEntity.badRequest().body("daily 파라미터가 없습니다.");
            }

            String daily = params.get("daily").toString();
            if (!daily.matches("\\d{8}")) { // YYYYMMDD 형식 검증
                return ResponseEntity.badRequest().body("잘못된 날짜 형식입니다. YYYYMMDD 형식으로 입력해주세요.");
            }

            int result = calendarService.updatestd(params);
            return ResponseEntity.ok().body(Map.of(
                    "message", "Successfully updated",
                    "updatedRows", result));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(Map.of(
                    "error", e.getMessage(),
                    "details", e.toString()));
        }
    }

    @GetMapping("/classinfo")
    public ResponseEntity<?> getStudentClassInfo(SearchDto dto) throws Exception {
        try {
            System.out.println("클래스 정보 요청: year=" + dto.getYear() + ", month=" + dto.getMonth());

            Map<String, Object> classInfo = calendarService.getStudentClassInfo(dto);

            if (classInfo == null || classInfo.isEmpty()) {
                System.out.println("클래스 정보 없음");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("클래스 정보가 없습니다.");
            }

            System.out.println("클래스 정보 반환: " + classInfo);
            return ResponseEntity.ok(classInfo);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("클래스 정보 가져오기 실패: " + e.getMessage());
        }
    }

}