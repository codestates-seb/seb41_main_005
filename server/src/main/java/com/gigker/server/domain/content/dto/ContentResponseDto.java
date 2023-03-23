package com.gigker.server.domain.content.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.gigker.server.domain.common.ContentType;
import com.gigker.server.domain.content.entity.Content;
import com.gigker.server.domain.workTime.dto.WorkTimeResponseDto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class ContentResponseDto {
	@Getter
	@Setter
	@NoArgsConstructor
	public static class ContentResponse {
		private long contentId;
		private Long memberId;
		private String nickName;
		private String pictureUrl;
		private Long reviewCount;
		private Long likeCount;
		private Long dislikeCount;
		private String title;
		private ContentType contentType;
		private Integer recruitingCount;
		private String workContent;
		private String qualification;
		private String preference;
		private String other;
		private String cityName;
		private String categoryName;
		private List<WorkTimeResponseDto> workTimes;
		private List<ContentTagResponseDto> contentTags;
		private int price;
		private LocalDateTime createdAt;
		private LocalDateTime lastModifiedAt;
		private LocalDateTime relistedAt;
		private LocalDateTime deadLine;
		private Content.Status status;
		private Boolean isPremium;
		private List<ContentApplyResponseDto.Applicant> applies;
	}

	@Getter
	@Setter
	@NoArgsConstructor
	public static class SimpleContentResponse {
		private Long contentId;
		private String title;
		private int price;
		private List<WorkTimeResponseDto> workTimes;
		private String cityName;
		private String categoryName;
		private List<ContentTagResponseDto> contentTags;
		private LocalDateTime createdAt;
		private LocalDateTime lastModifiedAt;
		private Long memberId;
		private String nickName;
	}
}
