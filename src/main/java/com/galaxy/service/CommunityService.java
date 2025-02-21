package com.galaxy.service;

import com.galaxy.dto.CommListDto;
import com.galaxy.dto.CommPostDto;
import com.galaxy.dto.CommSearchDto;

public interface CommunityService {
    // 게시글 목록을 조회하는 메서드를 정의합니다.
    CommListDto selectList(CommSearchDto searchDto) throws Exception;

    void addPost(CommPostDto postDto) throws Exception;

    CommListDto.CommItem selectPost(Long seq) throws Exception;

    boolean updatePost(CommListDto.CommItem postItem, String communityType) throws Exception;

    boolean deletePost(Long seq, String communityType) throws Exception; // 삭제 메소드
}