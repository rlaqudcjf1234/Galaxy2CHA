package com.galaxy.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.galaxy.dto.CommListDto;
import com.galaxy.dto.CommPostDto;
import com.galaxy.dto.CommSearchDto;
import com.galaxy.service.CommunityService;

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
            communityService.addPost(postDto);
            return ResponseEntity.ok("게시글이 성공적으로 등록되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{communityType}/read/{seq}")
    public ResponseEntity<?> getPostByType(
            @PathVariable("communityType") String communityType,
            @PathVariable("seq") Long seq) {
        try {
            System.out.println("Received request: communityType=" + communityType + ", seq=" + seq);

            // 기존 메서드 재사용
            CommListDto.CommItem post = communityService.selectPost(seq);

            if (post == null) {
                System.out.println("No post found for seq: " + seq);
                return ResponseEntity.notFound().build();
            }

            return ResponseEntity.ok(post);
        } catch (Exception e) {
            System.err.println("Error processing request:");
            e.printStackTrace();
            return ResponseEntity.badRequest().body("게시글 조회 중 오류 발생: " + e.getMessage());
        }
    }

    @DeleteMapping("/read/{seq}")
    public ResponseEntity<?> deletePost(@PathVariable Long seq) {
        try {
            boolean deleted = communityService.deletePost(seq);

            if (deleted) {
                return ResponseEntity.ok("게시글이 성공적으로 삭제되었습니다.");
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("오류 발생: " + e.getMessage());
        }
    }
}