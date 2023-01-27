package com.gigker.server.domain.schedule.dto;

import java.util.List;

import com.gigker.server.domain.common.ContentType;
import com.gigker.server.domain.common.WorkTimeResponseDto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ScheduleResponseDto {
    private Long contentId;
    private String title;
    private ContentType contentType;
    private Integer recruitingCount;
    private List<WorkTimeResponseDto> workTimes;
    private int price;
}