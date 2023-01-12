package com.gigker.server.domain.review.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import com.gigker.server.domain.common.ContentType;
import com.gigker.server.domain.common.LikeType;
import com.gigker.server.domain.content.entity.ContentApply;
import com.gigker.server.domain.member.entity.Member;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor
public class Review {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long reviewId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id", nullable = false)
	private Member member;

	@OneToOne
	@JoinColumn(name = "content_apply_id", nullable = false)
	private ContentApply contentApply;

	@Enumerated(value = EnumType.STRING)
	@Column
	private LikeType likeType;

	// 작성 제한 150자
	@Column(length = 150, nullable = false)
	private String comment;

	@Column(length = 150)
	private String secondComment;

	@Column(nullable = false)
	private boolean isAnonymous;

	@Enumerated(value = EnumType.STRING)
	@Column(nullable = false)
	private ContentType contentType;
}
