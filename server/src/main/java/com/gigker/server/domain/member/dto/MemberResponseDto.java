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
    private Long totalLikeCount;

    //종합 싫어요 수
    private Long totalDislikeCount;

    //종합 완료 건 수
    private Long totalCompletedCount;

    //종합 리뷰 수
    private  Long totalReviewCount;
    }


    @Getter
    @Setter
    public static class PatchDto{
        private long memberId;
        private String email;
        private String nickName;
        private String pictureUrl;
        private String about;
    }
}
