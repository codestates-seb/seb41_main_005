package com.gigker.server.domain.content.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.gigker.server.domain.content.entity.ContentTag;
import com.gigker.server.domain.workTime.entity.WorkTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ContentPatchDto {
	private Long contentId;
	private String title;
	private Integer recruitingCount;
	private String workContent;
	private String qualification;
	private String preference;
	private String other;
	private String categoryName;
	private List<ContentTag> contentTags;
	private List<WorkTime> workTimes;
	private String cityName;
	private int price;
	private LocalDateTime deadLine;
	private Boolean isPremium;
	private LocalDateTime relistedAt;
}
