package com.gigker.server.domain.tag.mapper;

import com.gigker.server.domain.tag.dto.TagPostDto;
import com.gigker.server.domain.tag.dto.TagResponseDto;
import com.gigker.server.domain.tag.entity.Tag;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TagMapper {
    Tag tagPostDtoToTag(TagPostDto requestBody);
    TagResponseDto tagResponseDto(Tag tag);
}
