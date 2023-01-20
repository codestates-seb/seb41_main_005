package com.gigker.server.domain.review.controller;

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

import com.gigker.server.domain.content.entity.Content;
import com.gigker.server.domain.content.service.ContentService;
import com.gigker.server.domain.member.dto.MemberProfileResponseDto;
import com.gigker.server.domain.member.entity.Member;
import com.gigker.server.domain.member.mapper.MemberMapper;
import com.gigker.server.domain.review.dto.ReviewDto;
import com.gigker.server.domain.review.entity.Review;
import com.gigker.server.domain.review.mapper.ReviewMapper;
import com.gigker.server.domain.review.service.ReviewService;
import com.gigker.server.global.dto.MultiResponseDto;
import com.gigker.server.global.dto.SingleResponseDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/reviews")
public class ReviewController {
	private final ReviewService reviewService;
	private final ReviewMapper reviewMapper;
	private final MemberMapper memberMapper;
	private final ContentService contentService;

	// 리뷰 작성
	@PostMapping
	public ResponseEntity postReview(
		@RequestBody @Valid ReviewDto.ReviewPost post) {

		Review review = reviewMapper.postToReview(post);
		reviewService.writeReview(review);

		return ResponseEntity.status(HttpStatus.CREATED).build();
	}

	// 2차 리뷰 작성
	@PatchMapping("/{review-id}")
	public ResponseEntity patchReview(
		@PathVariable("review-id") @Positive Long reviewId,
		@RequestBody @Valid ReviewDto.ReviewPatch patch) {

		reviewService.writeSecondReview(reviewId, patch);

		return ResponseEntity.ok().build();
	}

	// 특정 리뷰 삭제
	@DeleteMapping("/{review-id}")
	public ResponseEntity deleteReview(
		@PathVariable("review-id") @Positive Long reviewId) {

		reviewService.deleteReview(reviewId);

		return ResponseEntity.noContent().build();
	}

	// 글 작성자의 전체 리뷰 조회
	@GetMapping("/contents/{content-id}")
	public ResponseEntity getReviews(
		@PathVariable("content-id") @Positive Long contentId,
		@RequestParam @Positive int page) {

		Content content = contentService.findContentByContentId(contentId);
		Member member = content.getMember();
		// 페이지당 출력 수는 15로 고정
		Page<Review> pageReviews = reviewService.findAllReviewsByRecipient(content, member, page - 1, 15);
		List<ReviewDto.ReviewResponse> reviews = reviewMapper.reviewsToResponses(pageReviews.getContent());
		MemberProfileResponseDto.SimpleMemberResponse simpleMember = memberMapper.memberToSimpleMember(member);

		return ResponseEntity.ok().body(new MultiResponseDto<>(simpleMember, reviews, pageReviews));
	}

	// 특정 리뷰 조회
	@GetMapping("/{review-id}")
	public ResponseEntity getReview(
		@PathVariable("review-id") @Positive Long reviewId) {

		Review review = reviewService.findReview(reviewId);
		ReviewDto.ReviewResponse response = reviewMapper.reviewToResponse(review);

		return ResponseEntity.ok().body(new SingleResponseDto<>(response));
	}
}
