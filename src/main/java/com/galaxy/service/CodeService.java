package com.galaxy.service;

import java.util.List;
import java.util.Map;

public interface CodeService {

    List<Map<String, Object>> selectUseCode(int group_id)throws Exception;

}
