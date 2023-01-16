package com.gigker.server.domain.tag.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.gigker.server.domain.content.entity.ContentTag;

import lombok.*;

@Getter
@Entity
@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Tag {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long tagId;

	@Column(nullable = false, unique = true)
	private String name;

	@OneToMany(mappedBy = "tag")
	private List<ContentTag> contents = new ArrayList<>();
}
