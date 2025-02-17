package com.galaxy.service.impl;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.util.Date;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.galaxy.dto.ImageDto;
import com.galaxy.service.FileService;

@Service
public class FileServiceImpl implements FileService {

    @Value("${file.path}")
    private String filePath;

    @Override public ImageDto saveImage(MultipartFile file)throws Exception {

        if (file.isEmpty()) {
            return null;
        }

        String originalFilename = file.getOriginalFilename();
        String extension = "";
        if (originalFilename != null && originalFilename.indexOf(".") > 0) {
            extension = originalFilename.substring(originalFilename.lastIndexOf(".") + 1);
        }

        String uuid = (new Date().getTime()) + "" + UUID
            .randomUUID()
            .toString();
        String saveFilename = uuid + "." + extension;
        String savePath = filePath + saveFilename;

        try {
            File saveDir = new File(filePath);
            // 폴더가 없을 경우 폴더 생성
            if (!saveDir.exists()) {
                saveDir.mkdirs();
            }

            // savePath로 파일 저장
            file.transferTo(new File(savePath));
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            return null;
        }

        ImageDto imageDto = new ImageDto(uuid, extension);

        return imageDto;
    }

    @Override public ByteArrayOutputStream readImage(ImageDto dto)throws Exception {

        File file = new File(filePath + dto.getUuid() + "." + dto.getExtension());
        if (file == null || !file.exists()) {
            return null;
        }

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        FileInputStream fis = new FileInputStream(file);
        try {

            byte buffer[] = new byte[1024];
            int length = 0;

            while ((length = fis.read(buffer)) != -1) {
                baos.write(buffer, 0, length);
            }
        } finally {
            if (fis != null) {
                fis.close();
            }
        }

        return baos;
    }

}