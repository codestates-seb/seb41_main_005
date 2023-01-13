package com.gigker.server.domain.stub;

import java.util.ArrayList;
import java.util.List;

import com.gigker.server.domain.content.entity.ContentApply;

public class ContentApplyStubData {
	public static ContentApply getApply() {

		return ContentApply.builder()
			.contentApplyId(1L)
			.applicant(MemberStubData.getMember())
			.content(ContentStubData.getContent())
			.applyStatus(ContentApply.ApplyStatus.NONE)
			.build();
	}

	public static List<ContentApply> getApplies() {
		List<ContentApply> applies = new ArrayList<>();

		for (int i = 1; i <= 4; i++) {
			ContentApply apply = ContentApply.builder()
				.contentApplyId((long) i)
				.applicant(MemberStubData.getMembers().get(i))
				.content(ContentStubData.getContent())
				.applyStatus(ContentApply.ApplyStatus.NONE)
				.build();

			applies.add(apply);
		}

		return applies;
	}
}
