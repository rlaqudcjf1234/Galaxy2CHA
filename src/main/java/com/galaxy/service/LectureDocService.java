package com.galaxy.service;

import java.util.List;

public interface LectureDocService {

    List<String> selectList(String lecture_seq, String division)throws Exception;

}
