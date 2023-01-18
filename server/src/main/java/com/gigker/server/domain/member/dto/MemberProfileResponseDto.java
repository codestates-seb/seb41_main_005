package com.gigker.server.domain.member.dto;



import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MemberProfileResponseDto {

    private String email;

    private String nickName;

    private String about;

    private String pictureUrl;

    //종합 좋아요 수
    private int count_like;

    //종합 싫어요 수
    private int count_dislike;

    //종합 완료 건 수
    private int complete;
}
