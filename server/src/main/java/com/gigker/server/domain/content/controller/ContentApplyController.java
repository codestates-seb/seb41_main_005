package com.gigker.server.domain.content.controller;

import java.util.List;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gigker.server.domain.content.dto.ContentApplyDto;
import com.gigker.server.domain.content.entity.ContentApply;
import com.gigker.server.domain.content.mapper.ContentApplyMapper;
import com.gigker.server.domain.content.service.ContentApplyService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/contents/{content-id}/apply")
public class ContentApplyController {
	private final ContentApplyService applyService;
	private final ContentApplyMapper applyMapper;

	// 게시글에 지원
	@PostMapping
	public ResponseEntity postApply(
		@PathVariable("content-id") @Positive Long contentId,
		@RequestBody @Valid ContentApplyDto.Post post) {

		ContentApply apply = applyService.createApply();

		ContentApplyDto.Response response = applyMapper.applyToResponse(apply);

		return ResponseEntity.status(HttpStatus.CREATED).build();
	}

	// 지원 요청 승인
	@PatchMapping("/{content-apply-id}")
	public ResponseEntity patchApply(
		@PathVariable("content-id") @Positive Long contentId,
		@PathVariable("content-apply-id") @Positive Long applyId) {

		ContentApply apply = applyService.acceptApply();

		return ResponseEntity.ok().build();
	}

	// 전체 신청자 목록 조회
	@GetMapping
	public ResponseEntity getApplies(
		@PathVariable("content-id") @Positive Long contentId) {

		List<ContentApply> applies = applyService.findAll();

		return ResponseEntity.status(HttpStatus.OK).body(null);
	}

	// 단일 신청자 목록 조회
	@GetMapping("/{content-apply-id}")
	public ResponseEntity getApply(
		@PathVariable("content-id") @Positive Long contentId,
		@PathVariable("content-apply-id") @Positive Long applyId) {

		ContentApply apply = applyService.findApply();

		return ResponseEntity.status(HttpStatus.OK).body(null);
	}

	// 지원 취소
	@DeleteMapping("/{content-apply-id}")
	public ResponseEntity deleteApply(
		@PathVariable("content-id") @Positive Long contentId,
		@PathVariable("content-apply-id") @Positive Long applyId) {

		applyService.deleteApply(applyId);

		return ResponseEntity.noContent().build();
	}
}
