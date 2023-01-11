package com.gigker.server.domain.member.mapper;

import com.gigker.server.domain.member.entity.Profile;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProfileMaper {
    default Profile profileCreate(){
        Profile profile = Profile.builder()
                .buyLikeCount(0)
                .buyDislikeCount(0)
                .sellLikeCount(0)
                .sellDislikeCount(0)
                .completedBuyCount(0)
                .completedSellCount(0)
                .buyerPoint(0)
                .sellerPoint(0)
                .build();
        return profile;
    }
}
