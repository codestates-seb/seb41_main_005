package com.gigker.server.domain.review.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.gigker.server.domain.content.entity.Content;
import com.gigker.server.domain.member.entity.Member;
import com.gigker.server.domain.review.entity.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {

	@Query("select rv from Review rv " +
		"where rv.writer.applicant = :writer and rv.writer.content = :content")
	Optional<Review> findByWriterAndContent(@Param("writer") Member member, @Param("content") Content content);
}
