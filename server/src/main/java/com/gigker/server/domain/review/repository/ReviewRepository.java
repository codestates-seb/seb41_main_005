package com.gigker.server.domain.review.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gigker.server.domain.review.entity.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {

}
