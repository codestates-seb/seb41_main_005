package com.gigker.server.domain.workTime.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class WorkTimeResponseDto {
	private LocalDateTime startWorkTime;
	private LocalDateTime endWorkTime;
}
