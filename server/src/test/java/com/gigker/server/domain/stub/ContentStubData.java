package com.gigker.server.domain.stub;

import com.gigker.server.domain.common.ContentType;
import com.gigker.server.domain.content.entity.Content;

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
}
