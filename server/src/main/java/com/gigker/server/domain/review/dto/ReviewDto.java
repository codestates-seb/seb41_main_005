package com.gigker.server.domain.review.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

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
		@Size(max = 200)
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
		private String writerNickName;
		private Long recipientId;
		private LikeType likeType;
		private String comment;
		private String secondComment;
		private Boolean isAnonymous;
		private ContentType contentType;
	}

	@Getter
	@Setter
	@NoArgsConstructor
	public static class SimpleMemberResponse {
		private Long memberId;
		private String nickName;
		private String pictureUrl;
		private Long likeCount;
		private Long dislikeCount;
		private Long reviewCount;
	}
}
