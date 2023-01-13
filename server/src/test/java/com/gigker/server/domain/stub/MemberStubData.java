package com.gigker.server.domain.stub;

import java.util.ArrayList;
import java.util.List;

import com.gigker.server.domain.member.entity.Member;

public class MemberStubData {

	// getMember 정보는 getMembers.get(0) 정보와 같다.
	public static Member getMember() {
		return Member.builder()
			.memberId(1L)
			.email("user01@hello.com")
			.password("0001")
			.nickName("user01")
			.about("편돌이 1년차")
			.pictureUrl("asd")
			.memberStatus(Member.MemberStatus.MEMBER_ACTIVE)
			.build();
	}

	public static List<Member> getMembers() {
		List<Member> members = new ArrayList<>();

		for (int i = 1; i <= 5; i++) {
			Member member = Member.builder()
				.memberId((long)i)
				.email(String.format("user%02d@hello.com", i))
				.password(String.format("%04d", i))
				.nickName(String.format("user%02d", i))
				.about("편돌이 1년차")
				.pictureUrl("asd")
				.memberStatus(Member.MemberStatus.MEMBER_ACTIVE)
				.build();

			members.add(member);
		}
		return members;
	}
}
