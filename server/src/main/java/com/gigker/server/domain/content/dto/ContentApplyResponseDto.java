package com.gigker.server.domain.content.dto;

import com.gigker.server.domain.content.entity.ContentApply;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class ContentApplyResponseDto {
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
