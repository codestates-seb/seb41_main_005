package com.gigker.server.domain.member.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

import com.gigker.server.domain.common.BaseEntity;
import com.gigker.server.domain.common.ContentType;
import com.gigker.server.domain.common.LikeType;
import com.gigker.server.domain.content.entity.Bookmark;
import com.gigker.server.domain.content.entity.Content;
import com.gigker.server.domain.content.entity.ContentApply;
import com.gigker.server.domain.review.entity.Review;

import lombok.*;

@Getter @Builder
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Member extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "member_id")
	private Long memberId;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "profile_id" )
	private Profile profile;
	public void addProfile(Profile profile){this.profile = profile;}

	@OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Content> contents = new ArrayList<>();

	@OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Bookmark> bookmarks = new ArrayList<>();

	@OneToMany(mappedBy = "recipient", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Review> reviews = new ArrayList<>();

	@OneToMany(mappedBy = "applicant", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<ContentApply> schedules = new ArrayList<>();

	//이메일
	@Column(nullable = false, unique = true)
	private String email;

	//비밀번호
	@Column(nullable = false, length = 100)
	@Setter
	private String password;

	//닉네임
	@Column(nullable = false, unique = true)
	private String nickName;

	//사진Url
	@Column(nullable = false)
	@Setter
	private String pictureUrl;

	//자기소개
	@Column(nullable = false)
	private String about;

	//회원 기본 상태 = 활동중
	@Enumerated(value = EnumType.STRING)
	@Column(length = 20, nullable = false)
	private MemberStatus memberStatus;

	@Builder.Default
	@ElementCollection(fetch = FetchType.EAGER)
	@Setter
	private List<String> roles = new ArrayList<>();

	//회원 상태
	public enum MemberStatus {

		MEMBER_ACTIVE("활동중"),

		MEMBER_QUIT("탈퇴 상태");

		@Getter
		private String status;

		MemberStatus(String status) {
			this.status = status;
		}
	}

	public int getTotalLikeCount() {

		return profile.getBuyLikeCount() + profile.getSellLikeCount();
	}

	public int getBuyLikeCount() {
		int count = (int)reviews.stream()
			.filter(review -> review.getContentType() == ContentType.BUY)
			.filter(review -> review.getLikeType() == LikeType.LIKE)
			.count();

		this.profile.setBuyLikeCount(count);
		return count;
	}

	public int getBuyDislikeCount() {
		int count = (int)reviews.stream()
			.filter(review -> review.getContentType() == ContentType.BUY)
			.filter(review -> review.getLikeType() == LikeType.DISLIKE)
			.count();

		this.profile.setBuyDislikeCount(count);
		return count;
	}

	public int getSellLikeCount() {
		int count = (int)reviews.stream()
			.filter(review -> review.getContentType() == ContentType.SELL)
			.filter(review -> review.getLikeType() == LikeType.LIKE)
			.count();

		this.profile.setSellLikeCount(count);
		return count;
	}

	public int getSellDislikeCount() {
		int count = (int)reviews.stream()
			.filter(review -> review.getContentType() == ContentType.SELL)
			.filter(review -> review.getLikeType() == LikeType.DISLIKE)
			.count();

		this.profile.setSellDislikeCount(count);
		return count;
	}

	public int getBuyReviewCount() {
		int count = (int)reviews.stream()
			.filter(review -> review.getContentType() == ContentType.BUY)
			.count();

		this.profile.setBuyReviewCount(count);
		return count;
	}

	public int getSellReviewCount() {
		int count = (int)reviews.stream()
			.filter(review -> review.getContentType() == ContentType.SELL)
			.count();

		this.profile.setSellReviewCount(count);
		return count;
	}
}
