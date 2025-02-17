package com.galaxy.controller;

import org.springframework.web.bind.annotation.RestController;

import com.galaxy.dto.ImageDto;
import com.galaxy.service.FileService;

import java.io.ByteArrayOutputStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping(value = "/image")
public class ImageController {

    @Autowired private FileService fileService;

    @GetMapping("/read")
    public byte[] read(ImageDto dto)throws Exception {

        ByteArrayOutputStream baos = fileService.readImage(dto);

        if (baos == null) {
            return null;
        }

        return baos.toByteArray();
    }

}
