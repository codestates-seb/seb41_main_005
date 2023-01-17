package com.gigker.server.domain.content.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import com.gigker.server.domain.content.dto.ContentApplyDto;
import com.gigker.server.domain.content.entity.ContentApply;

@Mapper(componentModel = "spring",
	// uses = {MemberMapper.class, ContentMapper.class},
	unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ContentApplyMapper {

	@Mapping(source = "post.applicantId", target = "applicant.memberId")
	@Mapping(source = "contentId", target = "content.contentId")
	ContentApply postToApply(ContentApplyDto.Post post, Long contentId);

	@Mapping(source = "applicant.nickName", target = "nickName")
	@Mapping(source = "applicant.pictureUrl", target = "pictureUrl")
	@Mapping(source = "applicant.about", target = "about")
	ContentApplyDto.Response applyToResponse(ContentApply apply);

	@Mapping(source = "applicant.nickName", target = "nickName")
	@Mapping(source = "applicant.pictureUrl", target = "pictureUrl")
	@Mapping(source = "applicant.about", target = "about")
	List<ContentApplyDto.Response> appliesToResponses(List<ContentApply> applies);
}
