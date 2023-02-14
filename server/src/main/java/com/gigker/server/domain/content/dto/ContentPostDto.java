package com.gigker.server.domain.content.dto;

import com.gigker.server.domain.common.ContentType;
import com.gigker.server.domain.common.WorkTime;
import com.gigker.server.domain.content.entity.ContentTag;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Positive;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class ContentPostDto {
    private String title;
    private ContentType contentType;
    private Integer recruitingCount;
    private String workContent;
    private String qualification;
    private String preference;
    private String other;
    private String categoryName;
    private List<ContentTag> contentTags;
    private List<WorkTime> workTimes;
    private String cityName;
    @Positive
    private int price;
    private LocalDateTime deadLine;
    private Boolean isPremium;
}
