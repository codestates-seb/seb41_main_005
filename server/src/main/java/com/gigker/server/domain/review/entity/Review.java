package com.gigker.server.domain.review.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import com.gigker.server.domain.common.ContentType;
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

	@Column(nullable = false)
	private String comment;

	@Column
	private String secondComment;

	@Column(nullable = false)
	private Boolean isAnonymous;

	@Column(nullable = false)
	private ContentType contentType;
}
