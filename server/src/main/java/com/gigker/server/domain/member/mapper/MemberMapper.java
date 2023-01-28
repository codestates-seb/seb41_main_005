package com.gigker.server.domain.member.mapper;


import com.gigker.server.domain.member.dto.MemberPatchDto;
import com.gigker.server.domain.member.dto.MemberPostDto;
import com.gigker.server.domain.member.dto.MemberResponseDto;
import com.gigker.server.domain.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Mapper(componentModel = "spring")
public interface MemberMapper {
    default Member memberPostToMember(MemberPostDto memberPostDto) {
        Member member = Member.builder()
                .email(memberPostDto.getEmail())
                .password(memberPostDto.getPassword())
                .nickName(memberPostDto.getNickName())
                .about(memberPostDto.getAbout())
                .memberStatus(Member.MemberStatus.MEMBER_ACTIVE)
                .build();
        return member;
    }

    Member memberPatchToMember(MemberPatchDto memberPatchDto);

    MemberResponseDto.PatchDto memberToPatchResponse(Member member);

    @Mapping(target = "email", source = "member.email")
    @Mapping(target = "nickName", source = "member.nickName")
    @Mapping(target = "about", source = "member.about")
    @Mapping(target = "pictureUrl", source = "member.pictureUrl")
    @Mapping(target = "totalLikeCount", expression = "java(totalCount.get(\"totalLikeCount\"))")
    @Mapping(target = "totalDislikeCount", expression = "java(totalCount.get(\"totalDislikeCount\"))")
    @Mapping(target = "totalReviewCount", expression = "java(totalCount.get(\"totalReviewCount\"))")
    @Mapping(target = "totalCompletedCount", source = "completeCount")
    MemberResponseDto.Profile memberToProfileResponse(
        Member member, Map<String, Long> totalCount, Long completeCount);


    default List<MemberResponseDto.Profile> memberToMemberResponses(
        List<Member> members, List<Map<String, Long>> totalCounts, List<Long> completeCounts){

        if (members == null && totalCounts == null && completeCounts == null) {
            return null;
        }

        int size = members.size();
        List<MemberResponseDto.Profile> responses = new ArrayList<>(size);

        for (int i = 0; i < size; i++) {
            MemberResponseDto.Profile profile = new MemberResponseDto.Profile();
            Member member = members.get(i);
            Map<String, Long> totalCount = totalCounts.get(i);
            Long completeCount = completeCounts.get(i);

            profile.setEmail(member.getEmail());
            profile.setNickName(member.getNickName());
            profile.setAbout(member.getAbout());
            profile.setPictureUrl(member.getPictureUrl());
            profile.setTotalLikeCount(totalCount.get("totalLikeCount"));
            profile.setTotalDislikeCount(totalCount.get("totalDislikeCount"));
            profile.setTotalReviewCount(totalCount.get("totalReviewCount"));
            profile.setTotalCompletedCount(completeCount);

            responses.add(profile);
        }

        return responses;
    }
}
