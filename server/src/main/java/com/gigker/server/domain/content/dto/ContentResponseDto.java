package com.gigker.server.domain.content.dto;

import com.gigker.server.domain.category.entity.Category;
import com.gigker.server.domain.common.ContentType;
import com.gigker.server.domain.common.WorkTime;
import com.gigker.server.domain.content.entity.Content;
import com.gigker.server.domain.content.entity.ContentApply;
import com.gigker.server.domain.content.entity.ContentTag;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class ContentResponseDto {
    private long contentId;
    private long memberId;
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
    private List<ContentTag> contentTags;
    private LocalDateTime createdAt;
    private LocalDateTime lastModifiedAt;
    private LocalDateTime relistedAt;
    private LocalDateTime deadLine;
    private Content.Status status;
    private boolean isPremium;
    private List<ContentApply> applies;
}
