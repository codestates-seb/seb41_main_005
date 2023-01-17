package com.gigker.server.domain.member.controller;

import com.gigker.server.domain.member.dto.MemberPatchDto;
import com.gigker.server.domain.member.dto.MemberPostDto;

import com.gigker.server.domain.member.dto.MemberProfileResponseDto;
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
import javax.validation.constraints.Positive;
import java.io.IOException;

@Validated
@RestController
@RequestMapping("/members")
public class MemberController {

	private final MemberService memberService;
	private final MemberMapper memberMapper;
	private final ProfileMapper profileMapper;

	public MemberController(MemberService memberService, MemberMapper memberMapper, ProfileMapper profileMapper)
	{
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

	//회원수정
	@PatchMapping(value = "{member-id}",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity updateMember(@PathVariable("member-id") @Positive long memberId,
									   @Valid @RequestPart(value = "key") MemberPatchDto memberPatchDto,
									   @RequestParam(value = "image")MultipartFile image) throws IOException
	{
		memberPatchDto.setMemberId(memberId);
		memberService.updateMember(memberMapper.memberPatchToMember(memberPatchDto),image);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	//회원탈퇴 (회원 상태 변경)
	@DeleteMapping("{member-id}")
	public ResponseEntity deleteMember(@PathVariable("member-id") @Positive long memberId)
	{
		memberService.deleteMember(memberId);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}


	//마이페이지 프로필 정보 조회
	@GetMapping("/{member-id}/profile")
	public ResponseEntity getMember(@PathVariable("member-id") long memberId)
	{
		Member member = memberService.findMemberById(memberId);
		MemberProfileResponseDto response = memberMapper.memberToMemberResponse(member,member.getProfile());
		return new ResponseEntity<>(response,HttpStatus.OK);
	}
}
