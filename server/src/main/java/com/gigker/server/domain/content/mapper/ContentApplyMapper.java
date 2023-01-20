package com.gigker.server.domain.content.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import com.gigker.server.domain.content.dto.ContentApplyResponseDto;
import com.gigker.server.domain.content.entity.Content;
import com.gigker.server.domain.content.entity.ContentApply;
import com.gigker.server.domain.member.mapper.MemberMapper;

@Mapper(componentModel = "spring",
	uses = {MemberMapper.class, ContentMapper.class},
	unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ContentApplyMapper {

	@Mapping(source = "post.applicantId", target = "applicant.memberId")
	@Mapping(source = "contentId", target = "content.contentId")
	ContentApply postToApply(ContentApplyResponseDto.Post post, Long contentId);

	@Mapping(source = "applicant.memberId", target = "applicantId")
	@Mapping(source = "content.contentId", target = "contentId")
	ContentApplyResponseDto.ApplyResponse applyToResponse(ContentApply apply);

	@Mapping(source = "applicant.memberId", target = "applicantId")
	@Mapping(source = "applicant.nickName", target = "nickName")
	@Mapping(source = "applicant.pictureUrl", target = "pictureUrl")
	@Mapping(source = "applicant.about", target = "about")
	@Mapping(target = "likeCount", expression = "java(apply.getLikeCount())")
	@Mapping(target = "dislikeCount", expression = "java(apply.getDislikeCount())")
	ContentApplyResponseDto.Applicant applyToApplicant(ContentApply apply);

	@Mapping(source = "applicant.memberId", target = "applicantId")
	@Mapping(source = "applicant.nickName", target = "nickName")
	@Mapping(source = "applicant.pictureUrl", target = "pictureUrl")
	@Mapping(source = "applicant.about", target = "about")
	@Mapping(target = "likeCount", expression = "java(apply.getLikeCount())")
	@Mapping(target = "dislikeCount", expression = "java(apply.getDislikeCount())")
	List<ContentApplyResponseDto.Applicant> appliesToApplicants(List<ContentApply> applies);
}
