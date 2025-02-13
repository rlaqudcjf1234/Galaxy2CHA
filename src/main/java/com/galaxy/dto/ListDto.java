package com.galaxy.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ListDto {

    private int totalCount;
    
    private Object items;

    public ListDto(int totalCount, Object items) {
        this.totalCount = totalCount;
        this.items = items;
    }
}