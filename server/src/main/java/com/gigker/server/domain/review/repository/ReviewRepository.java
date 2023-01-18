package com.gigker.server.domain.review.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gigker.server.domain.content.entity.Content;
import com.gigker.server.domain.member.entity.Member;
import com.gigker.server.domain.review.entity.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {

	Optional<Review> findByWriterAndContent(Member writer, Content content);
}
