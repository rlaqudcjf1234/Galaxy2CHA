package com.galaxy.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FileDto {

    private String filePath;

    private String originalFilename;

    private String saveFilename;

    public FileDto(String filePath, String originalFilename, String saveFilename) {
        this.filePath = filePath;
        this.originalFilename = originalFilename;
        this.saveFilename = saveFilename;
    }

}
