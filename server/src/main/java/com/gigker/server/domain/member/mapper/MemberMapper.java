package com.gigker.server.domain.member.mapper;


import com.gigker.server.domain.member.dto.MemberPatchDto;
import com.gigker.server.domain.member.dto.MemberPostDto;
import com.gigker.server.domain.member.dto.MemberResponseDto;
import com.gigker.server.domain.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;


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


    @Mapping(target = "totalLikeCount", expression = "java(member.getTotalLikeCount())")
    @Mapping(target = "totalDislikeCount", expression = "java(member.getTotalDisLikeCount())")
    @Mapping(target = "totalCompleted", expression = "java(member.getTotalComplete())")
    MemberResponseDto.Profile memberToProfileResponse(Member member);

    MemberResponseDto.PatchDto memberToPatchResponse(Member member);

    List<MemberResponseDto.Profile> memberToMemberResponses(List<Member> members);
}
