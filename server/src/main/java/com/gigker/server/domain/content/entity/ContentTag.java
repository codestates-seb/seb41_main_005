package com.gigker.server.domain.content.entity;

import javax.persistence.*;

import com.gigker.server.domain.tag.entity.Tag;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor
@Data
public class ContentTag {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "content_tag_id")
	private Long contentTagId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "content_id")
	private Content content;

	@Column(nullable = false)
	private String tagName;
}
