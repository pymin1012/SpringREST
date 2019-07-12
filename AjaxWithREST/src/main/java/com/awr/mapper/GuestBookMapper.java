package com.awr.mapper;

import java.util.ArrayList;

import com.awr.domain.GuestBookDTO;

public interface GuestBookMapper {

	public ArrayList<GuestBookDTO> list();
	public GuestBookDTO get(int gno);
	public int insert(GuestBookDTO guestbook);
	public int update(GuestBookDTO guestbook);
	public int delete(int gno);
	
}
