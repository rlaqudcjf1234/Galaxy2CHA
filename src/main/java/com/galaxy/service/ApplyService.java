package com.galaxy.service;

import java.util.List;
import java.util.Map;

import com.galaxy.dto.ApplyDto;

public interface ApplyService {

    public int selectCount(ApplyDto dto) throws Exception;

    public List<Map<String, Object>> selectList(ApplyDto dto) throws Exception;

    public void insertApply(ApplyDto dto) throws Exception;

    Map<String, Object> getApplyRead(String seq);

    int deleteApply(Long id);

    public void updateStatus(Long id, String useYn) throws Exception;

    void CreateStudent(Long id) throws Exception;
}
