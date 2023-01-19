package com.gigker.server.domain.member.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Builder
public class MemberProfileResponseDto {

    private String email;
    private String nickName;
    private String about;
    private String pictureUrl;
    private int likeCount;
    private int dislikeCount;
    private int buyLikeCount;
    private int buyDislikeCount;
    private int sellLikeCount;
    private int sellDislikeCount;
    private int reviewCount;
    private int completedBuyCount;
    private int completedSellCount;
    //종합 좋아요 수
    private int totalLikeCount;
    //종합 싫어요 수
    private int totalDislikeCount;
    //종합 완료 건 수
    private int totalCompleted;

    @Getter
    @Setter
    @NoArgsConstructor
    public static class SimpleMemberResponse {
        private int memberId;
        private String nickName;
        private String pictureUrl;
        private int likeCount;
        private int dislikeCount;
        private int reviewCount;
    }
}
