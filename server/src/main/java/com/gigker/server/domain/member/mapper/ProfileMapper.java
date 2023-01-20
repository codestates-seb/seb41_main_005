package com.gigker.server.domain.member.mapper;

import com.gigker.server.domain.member.entity.Profile;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProfileMapper {
    default Profile profileCreate(){
        Profile profile = Profile.builder()
                .buyLikeCount(10)
                .buyDislikeCount(10)
                .sellLikeCount(10)
                .sellDislikeCount(10)
                .completedBuyCount(10)
                .completedSellCount(10)
                .buyerPoint(0)
                .sellerPoint(0)
                .build();
        return profile;
    }
}
