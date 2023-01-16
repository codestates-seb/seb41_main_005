package com.gigker.server.domain.review.dto;

import java.util.List;

import com.gigker.server.domain.common.ContentType;
import com.gigker.server.domain.common.LikeType;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class ReviewDto {

	@Getter
	@Setter
	@NoArgsConstructor
	public static class Post {
		private Long writerId;
		private Long recipientId;
		private LikeType likeType;
		private String comment;
		private boolean isAnonymous;
		private ContentType type;
	}

	@Getter
	@Setter
	@NoArgsConstructor
	public static class Response {
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
