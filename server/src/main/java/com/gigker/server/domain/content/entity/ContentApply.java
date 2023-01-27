package com.gigker.server.domain.content.entity;

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
import javax.persistence.Table;

import com.gigker.server.domain.common.BaseEntity;
import com.gigker.server.domain.common.ContentType;
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
@Table(indexes = @Index(name = "idx_apply_content", columnList = "content_id"))
public class ContentApply extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long contentApplyId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id", nullable = false)
	private Member applicant;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "content_id", nullable = false)
	private Content content;

	@Enumerated(value = EnumType.STRING)
	@Column(length = 20, nullable = false)
	@Builder.Default
	private ApplyStatus applyStatus = ApplyStatus.NONE;

	public enum ApplyStatus {
		NONE("신청 중"),
		MATCH("매칭 완료"),
		COMPLETE("작업 완료");

		@Getter
		private String status;

		ApplyStatus(String status) {
			this.status = status;
		}
	}

	public void accept() {
		this.applyStatus = ApplyStatus.MATCH;
	}

	public void complete() {
		this.applyStatus = ApplyStatus.COMPLETE;
	}
}
