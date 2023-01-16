package com.gigker.server.domain.member.controller;

import com.gigker.server.domain.member.dto.MemberPostDto;
import com.gigker.server.domain.member.entity.Member;

import com.gigker.server.domain.member.mapper.MemberMapper;
import com.gigker.server.domain.member.mapper.ProfileMapper;
import com.gigker.server.domain.member.service.MemberService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;

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
	private final MemberMapper memberMapper;
	private final ProfileMapper profileMapper;

	public MemberController(MemberService memberService, MemberMapper memberMapper, ProfileMapper profileMapper) {
		this.memberService = memberService;
		this.memberMapper = memberMapper;
		this.profileMapper = profileMapper;
	}


	//회원가입
	//이미지 받기위한 URI 타입 MULTIPART_FORM 설정
	//Json데이터와 Img파일을 동시에 받으려면 form-data로 받아야하기 때문에 RequestPart로 Dto를 받도록 변경하였습니다.
	//파일은 따로 RequestParam을 통해 받을 수 있습니다.
	@PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity createMember(@Valid @RequestPart(value = "key") MemberPostDto memberPostDto,
									   @RequestParam(value = "image")MultipartFile image) throws IOException
	{
		memberService.saveMember(memberMapper.memberPostToMember(memberPostDto),
				profileMapper.profileCreate(),image);
		return new ResponseEntity<>(HttpStatus.CREATED);
	}






	//마이페이지 프로필 정보 조회
//	@GetMapping("/{member-id}")
//	public ResponseEntity getMember(@PathVariable("member-id") long memberId)
//	{
//		//Member findeMember =
//	}


}
