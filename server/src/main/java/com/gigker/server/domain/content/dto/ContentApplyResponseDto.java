package com.gigker.server.domain.content.dto;

import javax.validation.constraints.NotNull;

import com.gigker.server.domain.common.WorkTime;
import com.gigker.server.domain.content.entity.ContentApply;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class ContentApplyResponseDto {
	@Getter
	@Setter
	@NoArgsConstructor
	public static class Post {
		// TODO : 인증이 구현되면 Post 삭제
		@NotNull(message = "applicantId must not be null")
		private Long applicantId;
	}

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
		private int likeCount;
		private int dislikeCount;
		private int reviewCount;
		private ContentApply.ApplyStatus applyStatus;
	}
}
