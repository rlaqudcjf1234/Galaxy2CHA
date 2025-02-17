package com.galaxy.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface LectureDocMapper {

    List<String> selectList(
        @Param("lecture_seq")String lecture_seq,
        @Param("division")String division
    )throws Exception;

}
