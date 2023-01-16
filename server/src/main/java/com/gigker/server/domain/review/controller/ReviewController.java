package com.gigker.server.domain.review.controller;

import javax.validation.constraints.Positive;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gigker.server.domain.review.mapper.ReviewMapper;
import com.gigker.server.domain.review.service.ReviewService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/reviews")
public class ReviewController {
	private final ReviewService reviewService;
	private final ReviewMapper reviewMapper;

	// 리뷰 작성
	@PostMapping
	public ResponseEntity postReview() {

		return ResponseEntity.status(HttpStatus.CREATED).build();
	}

	// 2차 리뷰 작성
	@PatchMapping("/{review-id}")
	public ResponseEntity patchReview(
		@PathVariable("review-id") @Positive Long reviewId) {

		return ResponseEntity.ok().build();
	}

	// 특정 리뷰 삭제
	@DeleteMapping("/{review-id}")
	public ResponseEntity deleteReview(
		@PathVariable("review-id") @Positive Long reviewId) {

		return ResponseEntity.noContent().build();
	}

	// 글 작성자의 전체 리뷰 조회
	@GetMapping("/members/{member-id}")
	public ResponseEntity getReviews(
		@PathVariable("member-id") @Positive Long memberId) {

		return ResponseEntity.ok().body(null);
	}

	// 특정 리뷰 조회
	@GetMapping("/{review-id}")
	public ResponseEntity getReview(
		@PathVariable("review-id") @Positive Long reviewId) {

		return ResponseEntity.ok().body(null);
	}
}
