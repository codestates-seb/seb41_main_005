package com.gigker.server.domain.member.mapper;


import com.gigker.server.domain.member.dto.MemberPatchDto;
import com.gigker.server.domain.member.dto.MemberPostDto;
import com.gigker.server.domain.member.dto.MemberProfileResponseDto;
import com.gigker.server.domain.member.entity.Member;
import com.gigker.server.domain.member.entity.Profile;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;
import java.util.stream.Collectors;

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

    // @Mapping(target = "likeCount", expression = )
    // @Mapping(target = "dislikeCount", expression = )
    @Mapping(source = "profile.buyLikeCount", target = "buyLikeCount")
    @Mapping(source = "profile.buyDislikeCount", target = "buyDislikeCount")
    //sell Count
    // @Mapping(source = "profile.reviewCount", expression = )
    @Mapping(source = "profile.completedBuyCount", target = "completedBuyCount")
    @Mapping(source = "profile.completedSellCount", target = "completedSellCount")
    @Mapping(target = "totalLikeCount", expression = "java(member.getTotalLikeCount())")
    // @Mapping(target = "totalDislikeCount", expression = "java(profile.buyDisLikeCount + profile.sellDisLikeCount)")
    // @Mapping(target = "totalCompleted", expression = "java(new LocalDateTime().getTime())")
    MemberProfileResponseDto memberToMemberResponse(Member member);

    List<MemberProfileResponseDto> memberToMemberResponses(List<Member> members);

    // @Mapping(target = "likeCount", expression = "")
    // @Mapping(target = "dislikeCount", expression = "")
    // @Mapping(target = "reviewCount", expression = "")
    MemberProfileResponseDto.SimpleMemberResponse memberToSimpleMember(Member member);
}
