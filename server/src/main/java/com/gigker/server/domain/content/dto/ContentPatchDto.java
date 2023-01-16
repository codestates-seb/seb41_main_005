package com.gigker.server.domain.content.dto;

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
    private long contentId;
    private  String title;
    private Integer recruitingCount;
    private String workContent;
    private String qualification;
    private String preference;
    private String other;
//    private Category category;
    private List<ContentTag> contentTagList;
//    private List<WorkTime> workTimes;
    private String location;
    private int price;
    private LocalDateTime deadLine;
    private boolean isPremium;
    private LocalDateTime relistedAt;
}
