package com.gigker.server.domain.review.service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.gigker.server.domain.content.entity.Content;
import com.gigker.server.domain.content.entity.ContentApply;
import com.gigker.server.domain.content.service.ContentApplyService;
import com.gigker.server.domain.content.service.ContentService;
import com.gigker.server.domain.member.entity.Member;
import com.gigker.server.domain.member.service.MemberService;
import com.gigker.server.domain.review.dto.ReviewDto;
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
	private final MemberService memberService;
	private final ContentService contentService;
	private final ContentApplyService applyService;

	@Transactional
	public Review writeReview(Review review) {
		// Writer, Recipient 할당
		ContentApply apply = applyService.findVerifiedApply(review.getWriter().getContentApplyId());
		Content content = contentService.findContentByContentId(apply.getContent().getContentId());

		Member writer = memberService.findMemberById(apply.getApplicant().getMemberId());
		Member recipient = memberService.findMemberById(content.getMember().getMemberId());

		// TODO: 로그인한 사용자가 작성자인지 확인 (Authentication Token)

		// Content 및 ContentApply 완료 상태인지 확인
		verifyContentStatusIsCompleted(content);
		verifyContentApplyStatusIsCompleted(apply);

		// 이미 리뷰를 작성했는지 확인
		verifyReviewExist(writer, content);

		review.setRecipient(content.getMember());
		review.setContentType(content.getContentType());

		return reviewRepository.save(review);
	}

	@Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.SERIALIZABLE)
	public Review writeSecondReview(Long reviewId, ReviewDto.ReviewPatch patch) {
		Review review = findVerifyReview(reviewId);

		// 이미 2차 리뷰를 작성했는지 확인
		if (review.getSecondComment() != null) {
			throw new BusinessLogicException(ExceptionCode.EXISTS_REVIEW);
		}

		review.writeSecondReview(patch.getSecondComment());

		return review;
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

	// == Create ==

	// Content 완료 상태인지 확인
	private void verifyContentStatusIsCompleted(Content content) {
		if (!Objects.equals(content.getStatus(), Content.Status.COMPLETED)) {
			throw new BusinessLogicException(ExceptionCode.BAD_REQUEST_REVIEW);
		}
	}

	// Content Apply 완료 상태인지 확인
	private void verifyContentApplyStatusIsCompleted(ContentApply apply) {
		if (!Objects.equals(apply.getApplyStatus(), ContentApply.ApplyStatus.COMPLETE)) {
			throw new BusinessLogicException(ExceptionCode.BAD_REQUEST_REVIEW);
		}
	}

	// 이미 리뷰를 작성했는지 확인
	private void verifyReviewExist(Member writer, Content content) {
		Optional<Review> optionalReview = reviewRepository.findByWriterAndContent(writer, content);

		if (optionalReview.isPresent()) {
			throw new BusinessLogicException(ExceptionCode.EXISTS_REVIEW);
		}
	}

	// == Read ==

	// 해당 ReviewId가 존재하는지 확인
	@Transactional(readOnly = true)
	public Review findVerifyReview(Long reviewId) {
		Optional<Review> optionalReview = reviewRepository.findById(reviewId);

		Review findReview =
			optionalReview.orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_FOUND_REVIEW));

		return findReview;
	}
}
