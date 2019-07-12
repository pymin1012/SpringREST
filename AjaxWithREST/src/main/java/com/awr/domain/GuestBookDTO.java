package com.awr.domain;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
public class GuestBookDTO {
	
	private int gno;
	private String writer;
	private String ip;
	private Date regdate;
	private Date updateDate;
	private String content;
	
}
