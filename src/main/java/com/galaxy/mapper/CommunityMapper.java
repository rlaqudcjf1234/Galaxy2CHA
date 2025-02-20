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

    int deletePost(Long seq); // 추가된 삭제 메소드
}