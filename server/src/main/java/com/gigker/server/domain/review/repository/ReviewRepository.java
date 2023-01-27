package com.gigker.server.domain.review.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.gigker.server.domain.common.ContentType;
import com.gigker.server.domain.common.LikeType;
import com.gigker.server.domain.content.entity.Content;
import com.gigker.server.domain.member.entity.Member;
import com.gigker.server.domain.review.entity.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {

	@Query("select rv from Review rv " +
		"where rv.writer.applicant = :writer and rv.writer.content = :content")
	Optional<Review> findReviewByWriterAndContent(@Param("writer") Member writer, @Param("content") Content content);

	// ===== WRITTEN REVIEWS =====

	// 특정 회원이 작성한 리뷰 조회 (타입별)
	@Query("select rv from Review rv " +
		"where rv.writer.applicant = :writer and rv.contentType = :contentType")
	Page<Review> findAllReviewByWriterAndContentType(@Param("writer") Member writer,
		@Param("contentType") ContentType contentType, Pageable pageable);

	// 특정 회원이 작성한 리뷰 조회 (전체)
	@Query("select rv from Review rv where rv.writer.applicant = :writer")
	Page<Review> findAllReviewByWriter(@Param("writer") Member writer, Pageable pageable);

	// ===== RECEIVED REVIEWS =====

	// 특정 회원이 받은 리뷰 조회 (타입별)
	Page<Review> findAllReviewByRecipientAndContentType(Member recipient, ContentType contentType, Pageable pageable);

	// 특정 회원이 받은 리뷰 조회 (전체)
	Page<Review> findAllReviewByRecipient(Member recipient, Pageable pageable);

	// 특정 회원이 받은 리뷰 갯수 조회 (타입별)
	Long countReviewByRecipientAndContentType(Member recipient, ContentType contentType);

	// 특정 회원이 받은 리뷰 갯수 조회 (전체)
	Long countReviewByRecipient(Member recipient);

	// ===== RECEIVED LIKES =====

	// 특정 회원의 종합 좋아요 싫어요
	Long countByRecipientAndLikeType(Member recipient, LikeType likeType);

	// 타입별 LikeCount 조회
	@Query("select count (rv) from Review rv " +
		"where rv.recipient = :recipient and rv.likeType = 'LIKE' and rv.contentType = :type")
	Long countLike(@Param("recipient") Member recipient, @Param("type") ContentType type);

	// 타입별 DislikeCount 조회
	@Query("select count (rv) from Review rv " +
		"where rv.recipient = :recipient and rv.likeType = 'DISLIKE' and rv.contentType = :type")
	Long countDislike(@Param("recipient") Member recipient, @Param("type") ContentType type);

	// ===== TEMPORARY =====

	// 구인에 대해서 받은 리뷰 전체 조회 (사장)
	@Query("select rv from Review rv " +
		"where rv.contentType = 'BUY' and rv.recipient = :recipient")
	Page<Review> findAllByContentTypeIsBUY(@Param("recipient") Member recipient, Pageable pageable);

	// 구직에 대해서 받은 리뷰 전체 조회 (직원)
	@Query("select rv from Review rv " +
		"where rv.contentType = 'SELL' and rv.recipient = :recipient")
	Page<Review> findAllByContentTypeIsSELL(@Param("recipient") Member recipient, Pageable pageable);
}
