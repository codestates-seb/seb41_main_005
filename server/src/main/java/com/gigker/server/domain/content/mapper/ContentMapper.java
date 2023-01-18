package com.gigker.server.domain.content.mapper;

import com.gigker.server.domain.content.dto.ContentPatchDto;
import com.gigker.server.domain.content.dto.ContentPostDto;
import com.gigker.server.domain.content.dto.ContentResponseDto;
import com.gigker.server.domain.content.entity.Content;
import com.gigker.server.domain.member.mapper.MemberMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring" , unmappedTargetPolicy = ReportingPolicy.IGNORE, uses = MemberMapper.class)
public interface ContentMapper {

    @Mapping(source = "memberId", target = "member.memberId")
    Content contentPostDtoToContent(ContentPostDto requestBody);

    Content contentPatchDtoToContent(ContentPatchDto requestBody);

    ContentResponseDto.ContentResponse contentResponseDto(Content content);

    @Mapping(source = "contentId", target = "contentId")
    @Mapping(source = "price", target = "price")
    // @Mapping(source = "workTimes", target = "workTime")
    @Mapping(source = "member.memberId", target = "memberId")
    @Mapping(source = "member.nickName", target = "nickName")
    ContentResponseDto.SimpleContentResponse contentToSimpleContent(Content content);

    @Mapping(source = "contentId", target = "contentId")
    @Mapping(source = "price", target = "price")
    // @Mapping(source = "workTimes", target = "workTime")
    @Mapping(source = "member.memberId", target = "memberId")
    @Mapping(source = "member.nickName", target = "nickName")
    List<ContentResponseDto.SimpleContentResponse> contentsToSimpleContents(List<Content> content);
}
