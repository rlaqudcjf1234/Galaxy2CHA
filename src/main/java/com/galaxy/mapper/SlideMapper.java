package com.galaxy.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface SlideMapper {

    List<Map<String, Object>> slideList() throws Exception;
}
