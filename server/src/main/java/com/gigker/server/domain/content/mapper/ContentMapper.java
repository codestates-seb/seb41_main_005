package com.gigker.server.domain.content.mapper;

import com.gigker.server.domain.common.WorkTime;
import com.gigker.server.domain.common.WorkTimeMapper;
import com.gigker.server.domain.content.dto.ContentPatchDto;
import com.gigker.server.domain.content.dto.ContentPostDto;
import com.gigker.server.domain.content.dto.ContentResponseDto;
import com.gigker.server.domain.content.entity.Content;
import com.gigker.server.domain.content.entity.ContentTag;
import com.gigker.server.domain.member.mapper.MemberMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring" , unmappedTargetPolicy = ReportingPolicy.IGNORE,
        uses = {MemberMapper.class, WorkTimeMapper.class, ContentApplyMapper.class})
public interface ContentMapper {

    @Mapping(source = "memberId", target = "member.memberId")
    default Content contentPostDtoToContent(ContentPostDto requestBody) {
        Content content = new Content();

        List<ContentTag> contentTags = requestBody.getContentTags().stream()
                .map(contentTagDto -> {
                    ContentTag contentTag = new ContentTag();
                    contentTag.setContent(content);
                    contentTag.setTagName(contentTagDto.getTagName());
                    return contentTag;
                }).collect(Collectors.toList());

        List<WorkTime> workTimes = requestBody.getWorkTimes().stream()
                .map(workTimeDto -> {
                    WorkTime workTime = new WorkTime();
                    workTime.setStartWorkTime(workTimeDto.getStartWorkTime());
                    workTime.setEndWorkTime(workTimeDto.getEndWorkTime());
                    workTime.setContent(content);
                    return workTime;
                }).collect(Collectors.toList());

        content.setContentType(requestBody.getContentType());
        content.setRecruitingCount(requestBody.getRecruitingCount());
        content.setTitle(requestBody.getTitle());
        content.setContentTags(contentTags);
        content.setWorkTimes(workTimes);
        content.setWorkContent(requestBody.getWorkContent());
        content.setQualification(requestBody.getQualification());
        content.setPreference(requestBody.getPreference());
        content.setOther(requestBody.getOther());
        content.setPrice(requestBody.getPrice());
        content.setDeadLine(requestBody.getDeadLine());
        content.setIsPremium(requestBody.getIsPremium());

        return content;
    }
    @Mapping(source = "memberId", target = "member.memberId")
    default Content contentPatchDtoToContent(ContentPatchDto requestBody){
        Content content = new Content();
        List<ContentTag> contentTags = requestBody.getContentTags().stream()
                .map(contentTagDto -> {
                    ContentTag contentTag = new ContentTag();
                    contentTag.setContent(content);
                    contentTag.setTagName(contentTagDto.getTagName());
                    return contentTag;
                }).collect(Collectors.toList());

        List<WorkTime> workTimes = requestBody.getWorkTimes().stream()
                .map(workTimeDto -> {
                    WorkTime workTime = new WorkTime();
                    workTime.setStartWorkTime(workTimeDto.getStartWorkTime());
                    workTime.setEndWorkTime(workTimeDto.getEndWorkTime());
                    workTime.setContent(content);
                    return workTime;
                }).collect(Collectors.toList());

        content.setContentId(requestBody.getContentId());
        content.setTitle(requestBody.getTitle());
        content.setRecruitingCount(requestBody.getRecruitingCount());
        content.setWorkContent(requestBody.getWorkContent());
        content.setQualification(requestBody.getQualification());
        content.setPreference(requestBody.getPreference());
        content.setOther(requestBody.getOther());
        content.setContentTags(contentTags);
        content.setWorkTimes(workTimes);
        content.setPrice(requestBody.getPrice());
        content.setDeadLine(requestBody.getDeadLine());
        content.setIsPremium(requestBody.getIsPremium());
//        content.setRelistedAt(LocalDateTime.now());

        return content;
    }

    @Mapping(source = "contentId", target = "contentId")
    @Mapping(source = "member.memberId", target = "memberId")
    @Mapping(source = "member.nickName", target = "nickName")
    @Mapping(source = "category.categoryName", target = "categoryName")
    @Mapping(source = "location.cityName", target = "cityName")
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

    List<ContentResponseDto.ContentResponse> contentsResponseDto(List<Content> contents);
}
