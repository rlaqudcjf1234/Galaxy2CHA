package com.galaxy.service;

import java.util.List;
import java.util.Map;

public interface SlideService {

    List<Map<String, Object>> slideRead(String seq) throws Exception;
}
