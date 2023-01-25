package com.gigker.server.domain.member.dto;



import lombok.Getter;
import lombok.Setter;


public class MemberResponseDto {

    @Getter
    @Setter
    public static class Profile{

    private String email;

    private String nickName;

    private String about;

    private String pictureUrl;

    //종합 좋아요 수
    private int totalLikeCount;

    //종합 싫어요 수
    private int totalDislikeCount;

    //종합 완료 건 수
    private int totalCompleted;
    }
}
