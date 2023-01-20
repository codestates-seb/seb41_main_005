package com.gigker.server.domain.member.entity;

import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter @Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Profile {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "profile_id")
	private Long profileId;

	@Column(nullable = false)
	private int buyLikeCount;

	@Column(nullable = false)
	private int buyDislikeCount;

	@Column(nullable = false)
	private int sellLikeCount;

	@Column(nullable = false)
	private int sellDislikeCount;

	@Column(nullable = false)
	private int buyReviewCount;

	@Column(nullable = false)
	private int sellReviewCount;

	@Column(nullable = false)
	private int completedBuyCount;

	@Column(nullable = false)
	private int completedSellCount;

	@Column(nullable = false)
	private int buyerPoint;

	@Column(nullable = false)
	private int sellerPoint;
}
