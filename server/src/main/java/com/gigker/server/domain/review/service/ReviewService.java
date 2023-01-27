package com.gigker.server.domain.review.service;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.gigker.server.domain.common.ContentType;
import com.gigker.server.domain.common.LikeType;
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

		// 로그인한 사용자가 작성자인지 확인
		applyService.verifyThisMemberIsWriter(writer);

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
	public void writeSecondReview(Long reviewId, ReviewDto.ReviewPatch patch) {
		Review review = findVerifyReview(reviewId);
		Member writer = review.getWriter().getApplicant();

		// 로그인한 사용자가 작성자인지 확인
		applyService.verifyThisMemberIsWriter(writer);

		// 이미 2차 리뷰를 작성했는지 확인
		if (review.getSecondComment() != null) {
			throw new BusinessLogicException(ExceptionCode.EXISTS_REVIEW);
		}

		review.writeSecondReview(patch.getSecondComment());
	}

	public void deleteReview(Long reviewId) {
		Review review = findVerifyReview(reviewId);
		Member writer = review.getWriter().getApplicant();

		// 로그인한 사용자가 작성자인지 확인
		applyService.verifyThisMemberIsWriter(writer);

		reviewRepository.delete(review);
	}

	// 단일 리뷰 조회
	public Review findReview(Long reviewId) {

		return findVerifyReview(reviewId);
	}

	// ContentType 에 따른 받은 리뷰 조회
	public Page<Review> findAllReviewsByRecipient(Member member, ContentType type, int page, int size) {

		return reviewRepository.findAllReviewByRecipientAndContentType(member, type,
			PageRequest.of(page, size, Sort.by("lastModifiedAt").descending()));
	}

	// ContentType 에 따른 작성한 리뷰 조회
	public Page<Review> findAllReviewsByWriter(Member member, ContentType type, int page, int size) {

		return reviewRepository.findAllReviewByWriterAndContentType(member, type,
			PageRequest.of(page, size, Sort.by("lastModifiedAt").descending()));
	}

	// 해당 회원의 모든 평판 정보를 가져오는 로직
	public Map<String, Long> countProfiles(Member member) {
		Map<String, Long> map = new HashMap<>();
		map.put("totalLikeCount", reviewRepository.countByRecipientAndLikeType(member, LikeType.LIKE));
		map.put("totalDislikeCount", reviewRepository.countByRecipientAndLikeType(member, LikeType.DISLIKE));
		map.put("totalReviewCount", reviewRepository.countReviewByRecipient(member));

		return map;
	}

	// 해당 회원의 평판 정보를 가져오는 로직
	public Map<String, Long> countProfile(Member member, ContentType type) {
		Map<String, Long> map = new HashMap<>();
		map.put("likeCount", reviewRepository.countLike(member, type));
		map.put("dislikeCount", reviewRepository.countDislike(member, type));
		map.put("reviewCount", reviewRepository.countReviewByRecipientAndContentType(member, type));

		return map;
	}

	// 지원자의 평판 정보를 가져오는 로직
	public Map<String, Long> countApplicantProfile(Member applicant, ContentType type) {
		switch (type) {
			case BUY:
				// 구인 글에 지원한 사람은 구직에 대한 평판 정보를 보여준다.
				return countProfile(applicant, ContentType.SELL);
			case SELL:
				// 구직 글에 지원한 사람은 구인에 대한 평판 정보를 보여준다.
				return countProfile(applicant, ContentType.BUY);
			default:
				throw new BusinessLogicException(ExceptionCode.NOT_FOUND_TYPE);
		}
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
		Optional<Review> optionalReview = reviewRepository.findReviewByWriterAndContent(writer, content);

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
