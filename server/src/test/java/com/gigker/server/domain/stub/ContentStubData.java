package com.gigker.server.domain.stub;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.gigker.server.domain.category.entity.Category;
import com.gigker.server.domain.common.ContentType;
import com.gigker.server.domain.common.WorkTime;
import com.gigker.server.domain.content.entity.Content;
import com.gigker.server.domain.content.entity.ContentTag;
import com.gigker.server.domain.location.entity.Location;

public class ContentStubData {

	public static Content getContent() {
		Content content = new Content();
		content.setContentId(1L);
		content.setMember(MemberStubData.getMember());
		content.setContentType(ContentType.BUY);
		content.setTitle("제목");
		content.setRecruitingCount(3);
		content.setWorkContent("일할 사람");
		content.setWorkTimes(null);
		content.setCategory(null);
//		content.setLocation("444123");
		content.setPrice(100000);
		content.setStatus(Content.Status.RECRUITING);
		content.setIsPremium(false);

		return content;
	}

	public static Content getMatchedContent() {
		Content content = new Content();
		content.setContentId(2L);
		content.setMember(MemberStubData.getMember());
		content.setContentType(ContentType.BUY);
		content.setTitle("제목");
		content.setRecruitingCount(3);
		content.setWorkContent("일할 사람");
		content.setWorkTimes(null);
		content.setCategory(null);
//		content.setLocation("444123");
		content.setPrice(100000);
		content.setStatus(Content.Status.MATCHED);
		content.setIsPremium(false);

		return content;
	}

	public static List<Content> getContents() {
		List<Content> contents = new ArrayList<>();
		for (int i = 1; i <= 5; i++) {
			Content content = new Content();
			content.setContentId((long)i);
			content.setMember(MemberStubData.getMember());
			content.setContentType(ContentType.BUY);
			content.setTitle(String.format("제목%02d", i));
			content.setRecruitingCount(i);
			content.setWorkContent(String.format("업무내용%02d", i));
			content.setQualification(String.format("자격요건%02d", i));
			content.setPreference(String.format("우대사항%02d", i));
			content.setOther(String.format("기타사항%02d", i));
			content.setCategory(stubCategory());
			content.setContentTags(stubTags());
			content.setWorkTimes(stubWorkTimes());
			content.setLocation(stubLocation());
			content.setPrice(10000);
			content.setRelistedAt(LocalDateTime.now());
			content.setDeadLine(LocalDateTime.now().plusDays(1));
			content.setStatus(Content.Status.RECRUITING);
			content.setIsPremium(false);

			contents.add(content);
		}

		return contents;
	}

	private static Category stubCategory() {
		Category category = new Category();
		category.setCategoryId(1L);
		category.setCategoryName("서비스");

		return category;
	}

	private static List<ContentTag> stubTags() {
		List<ContentTag> tags = new ArrayList<>();
		for (int i = 1; i <= 5; i++) {
			ContentTag tag = new ContentTag();
			tag.setContentTagId((long)i);
			tag.setTagName(String.format("태그%02d", i));
			tag.setContent(null);

			tags.add(tag);
		}

		return tags;
	}

	private static List<WorkTime> stubWorkTimes() {
		List<WorkTime> workTimes = new ArrayList<>();
		for (int i = 1; i <= 2; i++) {
			WorkTime workTime = new WorkTime();
			workTime.setWorkTimeId((long)i);
			workTime.setStartWorkTime(LocalDateTime.now());
			workTime.setEndWorkTime(LocalDateTime.now().plusDays(1));
			workTime.setContent(null);

			workTimes.add(workTime);
		}

		return workTimes;
	}

	private static Location stubLocation() {
		return Location.builder()
			.locationId(1L)
			.stateName("서울")
			.cityName("강서구")
			.locationNumber("11111")
			.build();
	}
}
