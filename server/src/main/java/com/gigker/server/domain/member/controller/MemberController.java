package com.gigker.server.domain.member.controller;

import com.gigker.server.domain.member.dto.MemberPatchDto;
import com.gigker.server.domain.member.dto.MemberPostDto;

import com.gigker.server.domain.member.dto.MemberProfileResponseDto;
import com.gigker.server.domain.member.entity.Member;
import com.gigker.server.domain.member.mapper.MemberMapper;
import com.gigker.server.domain.member.mapper.ProfileMapper;
import com.gigker.server.domain.member.service.MemberService;
import com.gigker.server.global.dto.MultiResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.io.IOException;
import java.util.List;

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
	@PatchMapping(value ="/{member-id}",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity updateMember(@PathVariable("member-id") @Positive long memberId,
									   @Valid @RequestPart(value = "key") MemberPatchDto memberPatchDto,
									   @RequestParam(value = "image")MultipartFile image) throws IOException
	{
		memberPatchDto.setMemberId(memberId);
		memberService.updateMember(memberMapper.memberPatchToMember(memberPatchDto),image);
		return new ResponseEntity<>(HttpStatus.OK);
	}


	//멤버아이디로 회원 정보 조회
	@GetMapping("/{member-id}")
	public ResponseEntity getMember(@PathVariable("member-id") long memberId)
	{
		Member member = memberService.findMemberById(memberId);
		MemberProfileResponseDto response = memberMapper.memberToMemberResponse(member);
		return new ResponseEntity<>(response,HttpStatus.OK);
	}

	//로그인한 토큰으로 마이페이지 프로필 정보 조회
	@GetMapping("/profile")
	public ResponseEntity getMemberProfile()
	{
		Member member = memberService.findMemberByProfile();
		MemberProfileResponseDto response = memberMapper.memberToMemberResponse(member);
		return new ResponseEntity<>(response,HttpStatus.OK);
	}

	//전체회원조회
	@GetMapping
	public ResponseEntity getMembers(@Positive @RequestParam int page,
									 @Positive @RequestParam int size)
	{
		Page<Member> pageMembers = memberService.findMembers(page-1,size);
		List<Member> members = pageMembers.getContent();
		return new ResponseEntity<>(
				new MultiResponseDto<>(memberMapper.memberToMemberResponses(members),
				pageMembers),HttpStatus.OK);
	}

	//회원탈퇴 (회원 상태 변경)
	@DeleteMapping("/{member-id}")
	public ResponseEntity deleteMember(@PathVariable("member-id") @Positive long memberId)
	{
		memberService.deleteMember(memberId);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
