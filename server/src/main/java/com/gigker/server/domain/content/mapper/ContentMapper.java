package com.gigker.server.domain.content.mapper;

import com.gigker.server.domain.content.dto.ContentDto;
import com.gigker.server.domain.content.dto.ContentTagResponseDto;
import com.gigker.server.domain.content.entity.Content;
import com.gigker.server.domain.content.entity.ContentTag;
import com.gigker.server.domain.member.entity.Member;
import com.gigker.server.domain.tag.entity.Tag;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.time.LocalDateTime;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring" , unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ContentMapper {
    default Content contentPostDtoToContent(ContentDto.Post requestBody){
        Content content = new Content();
        Member member = new Member();

//        List<ContentTag> tags = requestBody.getTags().stream()
//                .map(contentTagDto -> {
//                    ContentTag tags = new Tag();
//                    tag.setName(tag.getName());
//                    tag.setContents(contentTagDto.getTag().getContents());
//                    return tag;
//                }).collect(Collectors.toList());
        content.setContentId(content.getContentId());
        content.setMember(content.getMember());
        content.setContentType(requestBody.getContentType());
        content.setTitle(requestBody.getTitle());
        content.setRecruitingCount(requestBody.getRecruitingCount());
        content.setWorkContent(requestBody.getWorkContent());
        content.setQualification(requestBody.getQualification());
        content.setPreference(requestBody.getPreference());
        content.setOther(requestBody.getOther());
//        content.setCategory(requestBody.getCategory());
//        content.setTags(tags);
//        content.setWorkTimes(requestBody.getWorkTimes());
        content.setLocation(requestBody.getLocation());
        content.setPrice(requestBody.getPrice());
        content.setPremium(requestBody.isPremium());

        return content;
    }

    default Content contentPatchDtoToContent(ContentDto.Patch requestBody) {

        return null;
    }

//    default ContentDto.Response contentToContentResponseDto(Content content){
//        List<ContentTag> contentTags = content.getTags();
//        List<ContentTagResponseDto> tagResponseDtos = new LinkedList<>();
//        for(int i=0; i<contentTags.size(); i++){
//            ContentTag ct = contentTags.get(i);
//            tagResponseDtos.add(
//                    new ContentTagResponseDto(ct.getContentTagId(), ct.getTag().getName()
//                    ));
//        }
//        ContentDto.Response contentResponseDto =
//                new ContentDto.Response(
//                        content.getContentId(),
//                        content.getMember().getMemberId(),
//                        content.getTitle(),
//                        content.getContentType(),
//                        content.getRecruitingCount(),
//                        content.getWorkContent(),
//                        content.getQualification(),
//                        content.getPreference(),
//                        content.getOther(),
//                        content.getLocation(),
//                        content.getCategory(),
//                        content.getWorkTimes(),
//                        content.getTags(),
//                        content.getCreatedAt(),
//                        content.getLastModifiedAt(),
//                        content.getRelistedAt(),
//                        content.getDeadLine(),
//                        content.getStatus(),
//                        content.isPremium(),
//                        content.getApplies());
//
//        return contentResponseDto;
//    }
}
