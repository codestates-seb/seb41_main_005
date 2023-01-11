package com.gigker.server.domain.member.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor
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
	private int reviewCount;

	@Column(nullable = false)
	private int completedBuyCount;

	@Column(nullable = false)
	private int completedSellCount;

	@Column(nullable = false)
	private int buyerPoint;

	@Column(nullable = false)
	private int sellerPoint;
}
