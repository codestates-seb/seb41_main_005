package com.gigker.server.domain.review.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.gigker.server.domain.common.BaseEntity;
import com.gigker.server.domain.common.ContentType;
import com.gigker.server.domain.common.LikeType;
import com.gigker.server.domain.content.entity.ContentApply;
import com.gigker.server.domain.member.entity.Member;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(indexes = {
	@Index(name = "idx_review_recipient", columnList = "recipient"),
	@Index(name = "idx_review_writer", columnList = "writer")})
public class Review extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long reviewId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "recipient_id", nullable = false)
	private Member recipient;

	@OneToOne
	@JoinColumn(name = "apply_id", nullable = false)
	private ContentApply writer;

	@Enumerated(value = EnumType.STRING)
	@Column
	private LikeType likeType;

	// 작성 제한 150자
	@Column(length = 150)
	private String comment;

	@Column(length = 150)
	private String secondComment;

	@Column(nullable = false)
	@Builder.Default
	private boolean isAnonymous = false;

	@Enumerated(value = EnumType.STRING)
	@Column(nullable = false)
	private ContentType contentType;

	public void writeSecondReview(String secondComment) {
		this.secondComment = secondComment;
	}

	public void setRecipient(Member recipient) {
		this.recipient = recipient;
	}

	public void setContentType(ContentType contentType) {
		this.contentType = contentType;
	}
}
