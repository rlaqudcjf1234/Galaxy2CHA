package com.galaxy.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CertificateMapper {



    void insertCertificate(Map<String, Object> params);

    List<Map<String, Object>> readCertificate(Map<String, Object> params);

    void deleteCertificate(Map<String, Object> params);
}