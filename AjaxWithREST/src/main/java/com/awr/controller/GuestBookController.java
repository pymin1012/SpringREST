package com.awr.controller;

import java.util.ArrayList;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.awr.domain.GuestBookDTO;
import com.awr.domain.ReplyDTO;
import com.awr.service.GuestBookService;

import lombok.AllArgsConstructor;

@Controller
@AllArgsConstructor
public class GuestBookController {

	private GuestBookService service;
	
	@GetMapping(value = {"/", "/guestbook"})
	public String guestbook() {
		return "guestbook";
	}
	
	@GetMapping(value = "/listBook")
	public @ResponseBody ResponseEntity<ArrayList<GuestBookDTO>> listBook() {
		try {
			ArrayList<GuestBookDTO> list = service.listBook();
			System.out.println(list);
			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);	
		}
	}
	
	@GetMapping(value = "/listReply/{gno}")
	public @ResponseBody ResponseEntity<ArrayList<ReplyDTO>> listReply(@PathVariable("gno") int gno) {
		try {
			ArrayList<ReplyDTO> list = service.listReply(gno);
			System.out.println(list);
			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PostMapping(value = "/addBook", consumes = "application/json", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public @ResponseBody ResponseEntity<String> addBook(@RequestBody GuestBookDTO guestbook) {
		try {
			System.out.println(guestbook);
			service.addBook(guestbook);
			return new ResponseEntity<>("success", HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("error", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PostMapping(value = "/addReply", consumes = "application/json", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public @ResponseBody ResponseEntity<String> addReply(@RequestBody ReplyDTO reply) {
		try {
			System.out.println(reply);
			service.addReply(reply);
			return new ResponseEntity<>("success", HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("error", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PutMapping(value = "/modifyBook", consumes = "application/json", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public @ResponseBody ResponseEntity<String> modifyBook(@RequestBody GuestBookDTO guestbook) {
		try {
			System.out.println(guestbook);
			service.modifyBook(guestbook);
			return new ResponseEntity<>("success", HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("error", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@DeleteMapping(value = "/removeReply/{rno}", produces = MediaType.TEXT_PLAIN_VALUE)
	public @ResponseBody ResponseEntity<String> removeReply(@PathVariable("rno") int rno) {
		try {
			System.out.println(rno);
			service.removeReply(rno);
			return new ResponseEntity<>("success", HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("error", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
