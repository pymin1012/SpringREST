package com.awr.service;

import java.util.ArrayList;

import com.awr.domain.GuestBookDTO;
import com.awr.domain.ReplyDTO;

public interface GuestBookService {
	
	public ArrayList<GuestBookDTO> listBook();
	public ArrayList<ReplyDTO> listReply(int gno);
	public GuestBookDTO getBook(int gno);
	public ReplyDTO getReply(int rno);
	public boolean addBook(GuestBookDTO guestbook);
	public boolean addReply(ReplyDTO reply);
	public boolean modifyBook(GuestBookDTO guestbook);
	public boolean modifyReply(ReplyDTO reply);
	public boolean removeBook(int gno);
	public boolean removeReply(int rno);
	
}
