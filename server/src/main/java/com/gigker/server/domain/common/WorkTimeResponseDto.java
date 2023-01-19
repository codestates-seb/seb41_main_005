package com.gigker.server.domain.common;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class WorkTimeResponseDto {
    private Long ContentId;
    private LocalDateTime startWorkTime;
    private LocalDateTime endWorkTime;
}
