package com.gigker.server.domain.content.mapper;

import com.gigker.server.domain.content.dto.ContentPatchDto;
import com.gigker.server.domain.content.dto.ContentPostDto;
import com.gigker.server.domain.content.dto.ContentResponseDto;
import com.gigker.server.domain.content.entity.Content;
import com.gigker.server.domain.member.mapper.MemberMaper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring" , unmappedTargetPolicy = ReportingPolicy.IGNORE, uses = MemberMaper.class)
public interface ContentMapper {

    @Mapping(source = "memberId", target = "member.memberId")
    Content contentPostDtoToContent(ContentPostDto requestBody);


    Content contentPatchDtoToContent(ContentPatchDto requestBody);

    Content contentResponseDto(Content content);
}
