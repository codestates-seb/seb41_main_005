package com.gigker.server.domain.content.controller;

import java.util.List;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gigker.server.domain.content.dto.ContentApplyResponseDto;
import com.gigker.server.domain.content.dto.ContentResponseDto;
import com.gigker.server.domain.content.entity.Content;
import com.gigker.server.domain.content.entity.ContentApply;
import com.gigker.server.domain.content.mapper.ContentApplyMapper;
import com.gigker.server.domain.content.mapper.ContentMapper;
import com.gigker.server.domain.content.service.ContentApplyService;
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

	// 게시글에 지원
	@PostMapping
	public ResponseEntity postApply(
		@PathVariable("content-id") @Positive Long contentId,
		@RequestBody @Valid ContentApplyResponseDto.Post post) {

		ContentApply apply = applyMapper.postToApply(post, contentId);
		applyService.createApply(apply);

		return ResponseEntity.status(HttpStatus.CREATED).build();
	}

	// 지원 요청 승인
	@PatchMapping("/{content-apply-id}")
	public ResponseEntity patchApply(
		@PathVariable("content-id") @Positive Long contentId,
		@PathVariable("content-apply-id") @Positive Long applyId) {

		applyService.acceptApply(applyId, contentId);

		return ResponseEntity.ok().build();
	}

	// 전체 신청자 목록 조회
	@GetMapping
	public ResponseEntity getApplies(
		@PathVariable("content-id") @Positive Long contentId,
		@RequestParam @Positive int page) {

		Content content = applyService.getContentByContentId(contentId);
		// 페이지당 출력 수는 15로 고정
		Page<ContentApply> pageApplies = applyService.findAllApplies(content, page - 1, 15);
		List<ContentApplyResponseDto.Applicant> applicants = applyMapper.appliesToApplicants(pageApplies.getContent());
		ContentResponseDto.SimpleContentResponse simpleContent = contentMapper.contentToSimpleContent(content);

		return ResponseEntity.status(HttpStatus.OK).body(new MultiResponseDto<>(simpleContent, applicants, pageApplies));
	}

	// 단일 신청자 목록 조회
	@GetMapping("/{content-apply-id}")
	public ResponseEntity getApply(
		@PathVariable("content-id") @Positive Long contentId,
		@PathVariable("content-apply-id") @Positive Long applyId) {

		ContentApply apply = applyService.findApply(applyId);
		ContentApplyResponseDto.Applicant applicant = applyMapper.applyToApplicant(apply);

		return ResponseEntity.status(HttpStatus.OK).body(new SingleResponseDto<>(applicant));
	}

	// 지원 취소
	@DeleteMapping("/{content-apply-id}")
	public ResponseEntity deleteApply(
		@PathVariable("content-id") @Positive Long contentId,
		@PathVariable("content-apply-id") @Positive Long applyId) {

		applyService.deleteApply(applyId);

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
