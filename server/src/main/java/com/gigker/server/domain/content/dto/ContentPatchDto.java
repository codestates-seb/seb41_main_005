package com.gigker.server.domain.content.dto;

import com.gigker.server.domain.category.entity.Category;
import com.gigker.server.domain.common.WorkTime;
import com.gigker.server.domain.content.entity.ContentTag;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class ContentPatchDto {
    private Long contentId;
    private String title;
    private Integer recruitingCount;
    private String workContent;
    private String qualification;
    private String preference;
    private String other;
    private String category;
    private List<ContentTag> contentTags;
    private List<WorkTime> workTimes;
    private String location;
    private int price;
    private LocalDateTime deadLine;
    private Boolean isPremium;
    private LocalDateTime relistedAt;
}
