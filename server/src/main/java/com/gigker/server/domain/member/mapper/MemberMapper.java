package com.gigker.server.domain.member.mapper;


import com.gigker.server.domain.member.dto.MemberPatchDto;
import com.gigker.server.domain.member.dto.MemberPostDto;
import com.gigker.server.domain.member.dto.MemberProfileResponseDto;
import com.gigker.server.domain.member.entity.Member;
import com.gigker.server.domain.member.entity.Profile;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MemberMapper {
    default Member memberPostToMember(MemberPostDto memberPostDto){
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

    default MemberProfileResponseDto memberToMemberResponse(Member member, Profile profile){
        MemberProfileResponseDto memberProfileResponseDto = MemberProfileResponseDto.builder()
                .email(member.getEmail())
                .nickName(member.getNickName())
                .about(member.getAbout())
                .pictureUrl(member.getPictureUrl())
                .count_like(profile.getBuyLikeCount() + profile.getSellLikeCount())         //종합 좋아요 수
                .count_dislike(profile.getBuyDislikeCount() + profile.getSellDislikeCount())//종합 싫어요 수
                .complete(profile.getCompletedBuyCount() + profile.getCompletedSellCount()) //종합 완료 건 수
                .build();
        return memberProfileResponseDto;
    }
}
