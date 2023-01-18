package com.gigker.server.domain.content.mapper;

import com.gigker.server.domain.category.entity.Category;
import com.gigker.server.domain.common.WorkTime;
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

@Mapper(componentModel = "spring" , unmappedTargetPolicy = ReportingPolicy.IGNORE, uses = MemberMapper.class)
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
//        List<Category> categories = requestBody.getCategories().stream()
//                .map(category1 -> {
//                    Category category = new Category();
//                    category.setCategoryName(category1.getCategoryName());
//                    category.setContent(content);
//                    return category;
//                }).collect(Collectors.toList());

        content.setContentType(requestBody.getContentType());
        content.setRecruitingCount(requestBody.getRecruitingCount());
        content.setTitle(requestBody.getTitle());
        content.setContentTags(contentTags);
        content.setWorkTimes(workTimes);
        content.setCategory(requestBody.getCategory());
        content.setWorkContent(requestBody.getWorkContent());
        content.setQualification(requestBody.getQualification());
        content.setPreference(requestBody.getPreference());
        content.setOther(requestBody.getOther());
        content.setLocation(requestBody.getLocation());
        content.setPrice(requestBody.getPrice());
        content.setDeadLine(requestBody.getDeadLine());
        content.setPremium(requestBody.isPremium());

        return content;
    }

    Content contentPatchDtoToContent(ContentPatchDto requestBody);

    @Mapping(source = "contentId", target = "contentId")
    @Mapping(source = "member.memberId", target = "memberId")
    @Mapping(source = "member.nickName", target = "nickName")
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
