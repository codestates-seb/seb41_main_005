package com.gigker.server.domain.content.dto;

import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class ContentApplyDto {
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
	public static class Response {
		private Long contentApplyId;
		private Long contentId;
		private Long applicantId;
		private String nickName;
		private String pictureUrl;
		private String about;
		private int like;
		private int dislike;
		private int reviewCount;
	}
}
