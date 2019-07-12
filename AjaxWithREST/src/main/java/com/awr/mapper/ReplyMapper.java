package com.awr.mapper;

import java.util.ArrayList;

import com.awr.domain.ReplyDTO;

public interface ReplyMapper {

	public ArrayList<ReplyDTO> list(int gno);
	public ReplyDTO get(int rno);
	public int insert(ReplyDTO reply);
	public int update(ReplyDTO reply);
	public int delete(int rno);
	
}
