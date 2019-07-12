package com.awr.domain;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
public class ReplyDTO {
	
	private int rno;
	private int gno;
	private String replyer;
	private String ip;
	private Date regdate;
	private Date updateDate;
	private String reply;
	
}
