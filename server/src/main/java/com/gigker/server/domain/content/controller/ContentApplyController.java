package com.gigker.server.domain.content.controller;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.validation.constraints.Positive;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gigker.server.domain.common.ContentType;
import com.gigker.server.domain.content.dto.ContentApplyResponseDto;
import com.gigker.server.domain.content.dto.ContentResponseDto;
import com.gigker.server.domain.content.entity.Content;
import com.gigker.server.domain.content.entity.ContentApply;
import com.gigker.server.domain.content.mapper.ContentApplyMapper;
import com.gigker.server.domain.content.mapper.ContentMapper;
import com.gigker.server.domain.content.service.ContentApplyService;
import com.gigker.server.domain.member.entity.Member;
import com.gigker.server.domain.member.service.MemberService;
import com.gigker.server.domain.review.service.ReviewService;
import com.gigker.server.global.dto.MultiResponseDto;
import com.gigker.server.global.dto.SingleResponseDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/contents/{content-id}/apply")
public class ContentApplyController {
	private final ContentApplyService applyService;
	private final ContentApplyMapper applyMapper;
	private final ContentMapper contentMapper;
	private final MemberService memberService;
	private final ReviewService reviewService;

	// 게시글에 지원
	@PostMapping
	public ResponseEntity postApply(
		@PathVariable("content-id") @Positive Long contentId) {

		Member applicant = memberService.getCurrentMember();
		ContentApply apply = applyService.createApply(contentId, applicant);
		ContentApplyResponseDto.ApplyResponse response = applyMapper.applyToResponse(apply);

		return ResponseEntity.status(HttpStatus.CREATED).body(response);
	}

	// 지원 요청 승인
	@PatchMapping("/{content-apply-id}")
	public ResponseEntity patchApply(
		@PathVariable("content-id") @Positive Long contentId,
		@PathVariable("content-apply-id") @Positive Long applyId) {

		Member writer = memberService.getCurrentMember();
		applyService.acceptApply(applyId, contentId, writer);

		return ResponseEntity.ok().build();
	}

	// 전체 신청자 목록 조회
	@GetMapping
	public ResponseEntity getApplies(
		@PathVariable("content-id") @Positive Long contentId,
		@RequestParam @Positive int page) {

		Content content = applyService.getContentByContentId(contentId);
		Member writer = memberService.getCurrentMember();
		ContentType type = content.getContentType();

		// 페이지당 출력 수는 15로 고정
		Page<ContentApply> pageApplies = applyService.findAllApplies(content, writer, page - 1, 15);
		List<ContentApply> applies = pageApplies.getContent();

		// 지원자의 리뷰, 좋아요 싫어요 갯수를 담은 List
		List<Map<String, Long>> counts = applies.stream()
			.map(apply -> reviewService.countApplicantProfile(apply.getApplicant(), type))
			.collect(Collectors.toList());

		List<ContentApplyResponseDto.Applicant> applicants = applyMapper.appliesToApplicants(applies, counts);
		ContentResponseDto.SimpleContentResponse simpleContent = contentMapper.contentToSimpleContent(content);

		return ResponseEntity.status(HttpStatus.OK)
			.body(new MultiResponseDto<>(simpleContent, applicants, pageApplies));
	}

	// 단일 신청자 목록 조회
	@GetMapping("/{content-apply-id}")
	public ResponseEntity getApply(
		@PathVariable("content-id") @Positive Long contentId,
		@PathVariable("content-apply-id") @Positive Long applyId) {

		Member writer = memberService.getCurrentMember();
		ContentApply apply = applyService.findApply(applyId, contentId, writer);
		Map<String, Long> counts =
			reviewService.countApplicantProfile(apply.getApplicant(), apply.getContent().getContentType());

		ContentApplyResponseDto.Applicant applicant = applyMapper.applyToApplicant(apply, counts);

		return ResponseEntity.status(HttpStatus.OK).body(new SingleResponseDto<>(applicant));
	}

	// 지원 취소
	@DeleteMapping("/{content-apply-id}")
	public ResponseEntity deleteApply(
		@PathVariable("content-id") @Positive Long contentId,
		@PathVariable("content-apply-id") @Positive Long applyId) {

		Member applicant = memberService.getCurrentMember();
		applyService.deleteApply(applyId, contentId, applicant);

		return ResponseEntity.noContent().build();
	}

	// TODO: 테스트를 위한 코드 (추후 삭제)
	@PatchMapping("/{content-apply-id}/completed")
	public ResponseEntity completed(
		@PathVariable("content-id") @Positive Long contentId,
		@PathVariable("content-apply-id") @Positive Long applyId) {

		applyService.completeApply(applyId);

		return ResponseEntity.ok().build();
	}
}
