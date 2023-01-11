package com.gigker.server.domain.member.controller;

import com.gigker.server.domain.member.dto.MemberPostDto;
import com.gigker.server.domain.member.mapper.MemberMaper;
import com.gigker.server.domain.member.mapper.ProfileMaper;
import com.gigker.server.domain.member.service.MemberService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Validated
@RestController
@RequestMapping("/members")
public class MemberController {
	/* 통신 테스트
	@GetMapping()
	public String hello(){
		return "느낌오조~ 프론트와 백엔드의 첫 통신이 성공하였습니다~!";
	}
	*/

	private final MemberService memberService;
	private final MemberMaper memberMaper;
	private final ProfileMaper profileMaper;

	public MemberController(MemberService memberService, MemberMaper memberMaper, ProfileMaper profileMaper) {
		this.memberService = memberService;
		this.memberMaper = memberMaper;
		this.profileMaper = profileMaper;
	}


	//회원가입
	@PostMapping()
	public ResponseEntity createMember(@Valid @RequestBody MemberPostDto memberPostDto)
	{
		memberService.saveMember(memberMaper.memberPostToMember(memberPostDto),
				profileMaper.profileCreate());
		return new ResponseEntity<>(HttpStatus.CREATED);
	}



}
