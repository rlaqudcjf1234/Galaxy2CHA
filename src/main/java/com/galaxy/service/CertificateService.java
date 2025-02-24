package com.galaxy.service;

import java.util.List;
import java.util.Map;

public interface CertificateService {

    void insertCertificate(Map<String, Object> params);

    List<Map<String, Object>> readCertificate(int seq);

    void deleteCertificate(Map<String, Object> params);

}
