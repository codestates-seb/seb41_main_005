package com.gigker.server.domain.member.controller;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Validated
@RestController
@RequestMapping("/members")
public class MemberController {

	@GetMapping()
	public String hello(){
		return "느낌오조~ 프론트와 백엔드의 첫 통신이 성공하였습니다~!";
	}


}
