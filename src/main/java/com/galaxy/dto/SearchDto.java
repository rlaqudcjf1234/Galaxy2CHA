package com.galaxy.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SearchDto extends PageDto {
	
	private String select = "";
	
	private String text = "";
    
    private String year;
    
    private String month;
    
    // Integer 값을 받아 문자열로 변환하는 메서드
    public void setYear(Integer year) {
        this.year = (year != null) ? year.toString() : null;
    }
    
    public void setMonth(Integer month) {
        this.month = (month != null) ? month.toString() : null;
    }
}