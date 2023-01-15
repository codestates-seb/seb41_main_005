package com.gigker.server.domain.tag.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

import com.gigker.server.domain.common.BaseEntity;
import com.gigker.server.domain.content.entity.Content;
import com.gigker.server.domain.content.entity.ContentTag;

import lombok.*;

@Getter
@Entity
@Data
@NoArgsConstructor
public class Tag extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long tagId;

	@Column(nullable = false)
	private String tagName;

	@OneToMany(mappedBy = "tag", cascade = CascadeType.ALL)
	private List<ContentTag> contentTags = new ArrayList<>();
	
//	public void addContent(List<ContentTag> contentTags) {
//		this.contentTags = contentTags;
//	}
}
