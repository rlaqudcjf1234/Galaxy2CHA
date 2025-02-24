package com.galaxy.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.galaxy.mapper.CertificateMapper;
import com.galaxy.service.CertificateService;

@Service
public class CertificateServiceImpl implements CertificateService {

    @Autowired
    private CertificateMapper certificateMapper;

    @Override
    public void insertCertificate(Map<String, Object> params) {
        certificateMapper.insertCertificate(params);
    }

    @Override
    public List<Map<String, Object>> readCertificate(int seq) {
        Map<String, Object> params = new HashMap<>();
        params.put("seq", seq);
        return certificateMapper.readCertificate(params);
    }

    @Override
    public void deleteCertificate(Map<String, Object> params) {
        certificateMapper.deleteCertificate(params);
    }
}