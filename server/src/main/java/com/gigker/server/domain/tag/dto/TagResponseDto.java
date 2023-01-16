package com.gigker.server.domain.tag.dto;

import com.gigker.server.domain.content.entity.ContentTag;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class TagResponseDto {
    private Long tagId;
    private String tagName;
    private List<ContentTag> contentTags;
}
