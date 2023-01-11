package com.gigker.server.domain.content.entity;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.gigker.server.domain.member.entity.Member;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor
public class ContentApply {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long contentApplyId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id", nullable = false)
	private Member applicant;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "content_id", nullable = false)
	private Content content;

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
}
