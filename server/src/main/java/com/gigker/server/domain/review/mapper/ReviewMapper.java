package com.gigker.server.domain.review.mapper;

import java.util.List;
import java.util.Map;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import com.gigker.server.domain.content.mapper.ContentApplyMapper;
import com.gigker.server.domain.member.entity.Member;
import com.gigker.server.domain.member.mapper.MemberMapper;
import com.gigker.server.domain.review.dto.ReviewDto;
import com.gigker.server.domain.review.entity.Review;

@Mapper(componentModel = "spring",
	uses = {MemberMapper.class, ContentApplyMapper.class},
	unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ReviewMapper {
	@Mapping(source = "contentApplyId", target = "writer.contentApplyId")
	Review postToReview(ReviewDto.ReviewPost post);

	@Mapping(source = "writer.applicant.memberId", target = "writerId")
	@Mapping(source = "writer.applicant.nickName", target = "writerNickName")
	@Mapping(source = "recipient.memberId", target = "recipientId")
	ReviewDto.ReviewResponse reviewToResponse(Review review);

	List<ReviewDto.ReviewResponse> reviewsToResponses(List<Review> reviews);

	@Mapping(target = "memberId", source = "member.memberId")
	@Mapping(target = "nickName", source = "member.nickName")
	@Mapping(target = "pictureUrl", source = "member.pictureUrl")
	@Mapping(target = "likeCount", expression = "java(counts.get(\"likeCount\"))")
	@Mapping(target = "dislikeCount", expression = "java(counts.get(\"dislikeCount\"))")
	@Mapping(target = "reviewCount", expression = "java(counts.get(\"reviewCount\"))")
	ReviewDto.SimpleMemberResponse contentToSimpleMember(Member member, Map<String, Long> counts);
}
