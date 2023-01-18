package com.gigker.server.domain.review.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.gigker.server.domain.common.ContentType;
import com.gigker.server.domain.common.LikeType;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class ReviewDto {

	@Getter
	@Setter
	@NoArgsConstructor
	public static class ReviewPost {
		@NotNull(message = "contentApplyId cannot be null")
		private Long contentApplyId;
		private LikeType likeType;
		private String comment;
		private boolean isAnonymous;
	}

	@Getter
	@Setter
	@NoArgsConstructor
	public static class ReviewPatch {
		@NotBlank(message = "Second review cannot be blank")
		private String secondComment;
	}

	@Getter
	@Setter
	@NoArgsConstructor
	public static class ReviewResponse {
		private Long reviewId;
		private Long writerId;
		private Long recipientId;
		private LikeType likeType;
		private String comment;
		private String second_comment;
		private boolean isAnonymous;
		private ContentType type;
	}
}
