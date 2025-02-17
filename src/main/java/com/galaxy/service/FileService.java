package com.galaxy.service;

import java.io.ByteArrayOutputStream;

import org.springframework.web.multipart.MultipartFile;

import com.galaxy.dto.ImageDto;

public interface FileService {

    ImageDto saveImage(MultipartFile file) throws Exception;

    ByteArrayOutputStream readImage(ImageDto dto) throws Exception;

}
