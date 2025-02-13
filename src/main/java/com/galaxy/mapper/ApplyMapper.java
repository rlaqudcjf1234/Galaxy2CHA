package com.galaxy.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import com.galaxy.dto.ApplyDto;
import com.galaxy.dto.SearchDto;

@Mapper
public interface ApplyMapper {

    int selectCount(SearchDto dto) throws Exception;

    List<Map<String, Object>> selectList(SearchDto dto) throws Exception;

    void insertApply(ApplyDto dto) throws Exception;

    // 기존 주민번호로 조회하는 메서드는 유지
    int selectByJumin(String jumin);
    
    // user_yn이 'N'인 데이터만 조회하는 새로운 메서드
    int selectActiveByJumin(String jumin);
    
    // 기존 전화번호로 조회하는 메서드는 유지
    int selectByPhone(String phone);
    
    // user_yn이 'N'인 데이터만 조회하는 새로운 메서드
    int selectActiveByPhone(String phone);
    Map<String, Object> selectApplyRead(String seq);

    int deleteApply(Long id);

    ApplyDto selectApplyByStudentInfo(@Param("name") String name,
                                      @Param("email") String email,
                                      @Param("jumin") String jumin);
}