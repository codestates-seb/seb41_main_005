package com.gigker.server.domain.review.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gigker.server.domain.review.entity.Review;
import com.gigker.server.domain.review.repository.ReviewRepository;
import com.gigker.server.global.exception.BusinessLogicException;
import com.gigker.server.global.exception.ExceptionCode;

import lombok.RequiredArgsConstructor;

@Transactional
@Service
@RequiredArgsConstructor
public class ReviewService {
	private final ReviewRepository reviewRepository;

	public Review writeReview(Review postReview) {

		return null;
	}

	public Review writeSecondReview(Long reviewId) {

		return null;
	}

	public void deleteReview(Long reviewId) {
		Review review = findVerifyReview(reviewId);

		reviewRepository.delete(review);
	}

	public Review findReview(Long reviewId) {

		return null;
	}

	public List<Review> findAll() {

		return null;
	}

	// 해당 ReviewId가 존재하는지 확인
	@Transactional(readOnly = true)
	public Review findVerifyReview(Long reviewId) {
		Optional<Review> optionalReview = reviewRepository.findById(reviewId);

		Review findReview =
			optionalReview.orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_FOUND_REVIEW));

		return findReview;
	}
}
