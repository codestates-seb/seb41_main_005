package com.gigker.server.domain.content.dto;

import com.gigker.server.domain.content.entity.ContentApply;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class ContentApplyResponseDto {
	@Getter
	@Setter
	@NoArgsConstructor
	public static class ApplyResponse {
		private Long contentApplyId;
		private Long applicantId;
		private Long contentId;
		private ContentApply.ApplyStatus applyStatus;
	}

	@Getter
	@Setter
	@NoArgsConstructor
	public static class Applicant {
		private Long contentApplyId;
		private Long applicantId;
		private String nickName;
		private String pictureUrl;
		private String about;
		private Long likeCount;
		private Long dislikeCount;
		private Long reviewCount;
		private ContentApply.ApplyStatus applyStatus;
	}
}
