package com.gigker.server.domain.content.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import com.gigker.server.domain.content.dto.ContentApplyDto;
import com.gigker.server.domain.content.entity.ContentApply;

@Mapper(componentModel = "spring",
	// uses = {MemberMapper.class, ContentMapper.class},
	unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ContentApplyMapper {

	// TODO : Member, Content의 Mapper가 만들어지면 매핑
	// @Mapping(target = "applicant", source = "member")
	// @Mapping(target = "content", source = "content")
	ContentApply postToApply(ContentApplyDto.Post post);

	// @Mapping(target = "nickName", source = "member.nickName")
	// @Mapping(target = "pictureUrl", source = "member.pictureUrl")
	// @Mapping(target = "about", source = "member.about")
	ContentApplyDto.Response applyToResponse(ContentApply apply);
}
