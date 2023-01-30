package com.gigker.server.domain.content.mapper;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import com.gigker.server.domain.content.dto.ContentApplyResponseDto;
import com.gigker.server.domain.content.entity.ContentApply;
import com.gigker.server.domain.member.mapper.MemberMapper;

@Mapper(componentModel = "spring",
	uses = {MemberMapper.class, ContentMapper.class},
	unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ContentApplyMapper {

	@Mapping(source = "applicant.memberId", target = "applicantId")
	@Mapping(source = "content.contentId", target = "contentId")
	ContentApplyResponseDto.ApplyResponse applyToResponse(ContentApply apply);

	@Mapping(target = "contentApplyId", source = "apply.contentApplyId")
	@Mapping(target = "applicantId", source = "apply.applicant.memberId")
	@Mapping(target = "nickName", source = "apply.applicant.nickName")
	@Mapping(target = "pictureUrl", source = "apply.applicant.pictureUrl")
	@Mapping(target = "about", source = "apply.applicant.about")
	@Mapping(target = "likeCount", expression = "java(count.get(\"likeCount\"))")
	@Mapping(target = "dislikeCount", expression = "java(count.get(\"dislikeCount\"))")
	@Mapping(target = "reviewCount", expression = "java(count.get(\"reviewCount\"))")
	@Mapping(target = "applyStatus", source = "apply.applyStatus")
	ContentApplyResponseDto.Applicant applyToApplicant(ContentApply apply, Map<String, Long> count);

	default List<ContentApplyResponseDto.Applicant> appliesToApplicants(
		List<ContentApply> applies, List<Map<String, Long>> counts) {

		if (applies == null && counts == null) {
			return null;
		}

		int size = applies.size();
		List<ContentApplyResponseDto.Applicant> responses = new ArrayList<>(size);

		for (int i = 0; i < size; i++) {
			ContentApplyResponseDto.Applicant applicant = new ContentApplyResponseDto.Applicant();
			ContentApply apply = applies.get(i);
			Map<String, Long> count = counts.get(i);

			applicant.setContentApplyId(apply.getContentApplyId());
			applicant.setApplyStatus(apply.getApplyStatus());
			applicant.setApplicantId(apply.getApplicant().getMemberId());
			applicant.setNickName(apply.getApplicant().getNickName());
			applicant.setPictureUrl(apply.getApplicant().getPictureUrl());
			applicant.setAbout(apply.getApplicant().getAbout());
			applicant.setLikeCount(count.get("likeCount"));
			applicant.setDislikeCount(count.get("dislikeCount"));
			applicant.setReviewCount(count.get("reviewCount"));

			responses.add(applicant);
		}

		return responses;
	}
}
