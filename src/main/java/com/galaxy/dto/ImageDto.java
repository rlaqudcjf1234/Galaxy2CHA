package com.galaxy.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ImageDto {

    private String uuid;

    private String extension;

    public ImageDto(){}

    public ImageDto(String uuid, String extension) {
        this.uuid = uuid;
        this.extension = extension;
    }

}
