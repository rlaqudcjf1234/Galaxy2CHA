package com.galaxy.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.galaxy.dto.CommSearchDto;

@Mapper
public interface CommunityMapper {
    // 전체 게시글 수 조회
    int selectCommunityCount(CommSearchDto searchDto) throws Exception;

    // 게시글 목록 조회
    List<Map<String, Object>> selectCommunityList(CommSearchDto searchDto) throws Exception;

    void insertCommunityPost(Map<String, Object> params) throws Exception;

    Map<String, Object> selectCommunityPost(Map<String, Object> params);

    int updatePost(Map<String, Object> params); // 수정 메소드

    int deletePost(Map<String, Object> params); // 삭제 메소드

    // 관리자 공지글 목록 조회
    List<Map<String, Object>> selectAdminNotices() throws Exception;

    // 관리자 공지글 상세 조회
    Map<String, Object> selectAdminCommunityPost(Map<String, Object> params);
}