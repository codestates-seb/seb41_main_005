package com.gigker.server.domain.content.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.gigker.server.domain.category.entity.Category;
import com.gigker.server.domain.common.BaseEntity;
import com.gigker.server.domain.common.ContentType;
import com.gigker.server.domain.location.entity.Location;
import com.gigker.server.domain.member.entity.Member;
import com.gigker.server.domain.workTime.entity.WorkTime;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@Data
@NoArgsConstructor
@Table(indexes = {
	@Index(name = "idx__category_location", columnList = "category_id, location_id")
})
public class Content extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long contentId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id")
	//	@OnDelete(action = OnDeleteAction.CASCADE)
	private Member member;

	@Column(nullable = false)
	private ContentType contentType;

	@Column(nullable = false, length = 30)
	private String title;

	// 모집 인원
	@Column
	private Integer recruitingCount;

	// 업무 내용
	@Column(columnDefinition = "MEDIUMTEXT", nullable = false)
	private String workContent;

	// 자격 요건
	@Column(columnDefinition = "MEDIUMTEXT")
	private String qualification;

	// 우대 사항
	@Column(columnDefinition = "MEDIUMTEXT")
	private String preference;

	// 기타
	@Column(columnDefinition = "MEDIUMTEXT")
	private String other;

	// 카테고리
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "category_id")
	private Category category;

	// 태그
	@OneToMany(mappedBy = "content", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<ContentTag> contentTags = new ArrayList<>();

	//	// 업무 시간
	@OneToMany(mappedBy = "content", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<WorkTime> workTimes = new ArrayList<>();

	// TODO : 지역 정보 추후에 API 연동
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "location_id")
	private Location location;

	// 보수
	@Column(nullable = false)
	private int price;

	// 끌어 올림
	@Column
	private LocalDateTime relistedAt;

	// 모집 마감 시간
	@Column
	private LocalDateTime deadLine;

	@Enumerated(value = EnumType.STRING)
	@Column//(length = 20, nullable = false)
	private Status status = Status.RECRUITING;

	// 프리미엄 여부
	@Column(nullable = false)
	private Boolean isPremium;

	@OneToMany(mappedBy = "content", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<ContentApply> applies = new ArrayList<>();

	@OneToMany(mappedBy = "content")
	private List<Bookmark> bookmarks = new ArrayList<>();

	public enum Status {
		RECRUITING("모집중"),
		MATCHED("모집완료"),
		COMPLETED("종료된 게시물"),
		EXPIRED("모집기간 종료");

		@Getter
		private String status;

		Status(String status) {
			this.status = status;
		}
	}

	public void setMember(Member member) {
		this.member = member;
	}
}
