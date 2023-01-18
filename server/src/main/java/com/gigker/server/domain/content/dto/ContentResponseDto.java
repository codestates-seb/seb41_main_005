package com.gigker.server.domain.content.dto;

import com.gigker.server.domain.category.entity.Category;
import com.gigker.server.domain.common.ContentType;
import com.gigker.server.domain.common.WorkTime;
import com.gigker.server.domain.content.entity.Content;
import com.gigker.server.domain.content.entity.ContentApply;
import com.gigker.server.domain.content.entity.ContentTag;
import com.gigker.server.domain.tag.entity.Tag;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

public class ContentResponseDto {
    @Getter
    @Setter
    @NoArgsConstructor
    public static class ContentResponse {
        private long contentId;
        private long memberId;
        private String nickName;
        private String title;
        private ContentType contentType;
        private Integer recruitingCount;
        private String workContent;
        private String qualification;
        private String preference;
        private String other;
        private String location;
        private Category category;
        private List<WorkTime> workTimes;
        private List<ContentTagResponseDto> contentTags;
        private LocalDateTime createdAt;
        private LocalDateTime lastModifiedAt;
        private LocalDateTime relistedAt;
        private LocalDateTime deadLine;
        private Content.Status status;
        private boolean isPremium;
        private List<ContentApplyResponseDto.Applicant> applies;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class SimpleContentResponse {
        private Long contentId;
        private int price;
        private List<WorkTime> workTimes;
        private Long memberId;
        private String nickName;
    }
}