package com.awr.service;

import java.util.ArrayList;

import org.springframework.stereotype.Service;

import com.awr.domain.GuestBookDTO;
import com.awr.domain.ReplyDTO;
import com.awr.mapper.GuestBookMapper;
import com.awr.mapper.ReplyMapper;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class GuestBookServiceImpl implements GuestBookService {

	private GuestBookMapper gmapper;
	private ReplyMapper rmapper;
	
	@Override
	public ArrayList<GuestBookDTO> listBook() {
		return gmapper.list();
	}
	
	@Override
	public ArrayList<ReplyDTO> listReply(int gno) {
		return rmapper.list(gno);
	}
	
	@Override
	public GuestBookDTO getBook(int gno) {
		return gmapper.get(gno);
	}
	
	@Override
	public ReplyDTO getReply(int rno) {
		return rmapper.get(rno);
	}
	
	@Override
	public boolean addBook(GuestBookDTO guestbook) {
		if (gmapper.insert(guestbook) == 1) return true;
		return false;
	}
	
	@Override
	public boolean addReply(ReplyDTO reply) {
		if (rmapper.insert(reply) == 1) return true;
		return false;
	}
	
	@Override
	public boolean modifyBook(GuestBookDTO guestbook) {
		if (gmapper.update(guestbook) == 1) return true;
		return false;
	}
	
	@Override
	public boolean modifyReply(ReplyDTO reply) {
		if (rmapper.update(reply) == 1) return true;
		return false;
	}
	
	@Override
	public boolean removeBook(int gno) {
		if (gmapper.delete(gno) == 1) return true;
		return false;
	}
	
	@Override
	public boolean removeReply(int rno) {
		if (rmapper.delete(rno) == 1) return true;
		return false;
	}
	
}

