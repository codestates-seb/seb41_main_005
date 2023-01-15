package com.gigker.server.domain.content.mapper;

import com.gigker.server.domain.content.dto.ContentDto;
import com.gigker.server.domain.content.entity.Content;
import com.gigker.server.domain.member.mapper.MemberMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring" , unmappedTargetPolicy = ReportingPolicy.IGNORE, uses = MemberMapper.class)
public interface ContentMapper {

    @Mapping(source = "memberId", target = "member.memberId")
    Content contentPostDtoToContent(ContentDto.Post requestBody);

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
