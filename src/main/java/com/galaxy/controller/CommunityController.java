package com.galaxy.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.galaxy.dto.CommListDto;
import com.galaxy.dto.CommPostDto;
import com.galaxy.dto.CommSearchDto;
import com.galaxy.service.CommunityService;
import com.galaxy.util.HttpLoginUtil; // 추가
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/community")
@RequiredArgsConstructor
@Slf4j
public class CommunityController {

    private final CommunityService communityService;

    @GetMapping("/list")
    public CommListDto getList(CommSearchDto searchDto) throws Exception {
        return communityService.selectList(searchDto);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addPost(@RequestBody CommPostDto postDto) {
        try {
            // 토큰에서 학생 정보 가져오기
            String studentSeq = HttpLoginUtil.getSeq();
            log.info("학생 SEQ: {}", studentSeq);
            
            if (studentSeq == null || studentSeq.isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body("유효한 학생 정보가 없습니다.");
            }
            
            // studentSeq 설정
            postDto.setStudentSeq(Long.valueOf(studentSeq));
            
            // CLASS 게시판인 경우 반드시 classSeq 필요
            if ("CLASS".equals(postDto.getTableType())) {
                String classSeq = HttpLoginUtil.getClass_seq();
                if (classSeq != null && !classSeq.isEmpty()) {
                    postDto.setClassSeq(Long.valueOf(classSeq));
                    log.info("Class SEQ 설정: {}", classSeq);
                } else {
                    return ResponseEntity.badRequest().body("반 정보를 찾을 수 없습니다. 반 게시판에 글을 작성할 수 없습니다.");
                }
            }
            
            communityService.addPost(postDto);
            return ResponseEntity.ok("게시글이 성공적으로 등록되었습니다.");
        } catch (Exception e) {
            log.error("게시글 등록 오류: ", e);
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/read/{seq}")
    public ResponseEntity<?> getPostByType(
            @PathVariable("seq") Long seq,
            @RequestParam(value = "tableType", required = true) String tableType) {
        try {
            log.info("Received request: tableType=" + tableType + ", seq=" + seq);
            CommListDto.CommItem post = communityService.selectPost(seq, tableType);
            if (post == null) {
                log.info("No post found for seq: " + seq);
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(post);
        } catch (Exception e) {
            log.error("Error processing request:", e);
            return ResponseEntity.badRequest().body("게시글 조회 중 오류 발생: " + e.getMessage());
        }
    }

    @PutMapping("/read/{seq}")
    public ResponseEntity<?> updatePost(
            @PathVariable("seq") Long seq,
            @RequestParam(value = "tableType", required = true) String tableType,
            @RequestBody CommListDto.CommItem postItem) {
        try {
            postItem.setSeq(seq);
            boolean updated = communityService.updatePost(postItem, tableType);
            if (updated) {
                return ResponseEntity.ok("게시글이 성공적으로 수정되었습니다.");
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("오류 발생: " + e.getMessage());
        }
    }

    @DeleteMapping("/read/{seq}")
    public ResponseEntity<?> deletePost(
            @PathVariable("seq") Long seq,
            @RequestParam(value = "tableType", required = true) String tableType) {
        try {
            boolean deleted = communityService.deletePost(seq, tableType);
            if (deleted) {
                return ResponseEntity.ok("게시글이 성공적으로 삭제되었습니다.");
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("오류 발생: " + e.getMessage());
        }
    }
    
    // 아래 메서드가 JWT 토큰에서 사용자 정보를 추출하여 반환하는 엔드포인트입니다.
    @GetMapping("/auth/me")
    public ResponseEntity<Map<String, String>> getUserInfo() {
        Map<String, String> userInfo = new HashMap<>();
        String seq = HttpLoginUtil.getSeq();
        String classSeq = HttpLoginUtil.getClass_seq();
        String name = new HttpLoginUtil().getName();
        String email = new HttpLoginUtil().getEmail();
        String id = new HttpLoginUtil().getId();

        userInfo.put("seq", seq);
        userInfo.put("classSeq", classSeq);
        userInfo.put("name", name);
        userInfo.put("email", email);
        userInfo.put("id", id);

        return ResponseEntity.ok(userInfo);
    }
}
