package com.gigker.server.domain.review.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import com.gigker.server.domain.content.mapper.ContentApplyMapper;
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
	@Mapping(source = "recipient.memberId", target = "recipientId")
	ReviewDto.ReviewResponse reviewToResponse(Review review);

	@Mapping(source = "writer.applicant.memberId", target = "writerId")
	@Mapping(source = "recipient.memberId", target = "recipientId")
	List<ReviewDto.ReviewResponse> reviewsToResponses(List<Review> reviews);
}
