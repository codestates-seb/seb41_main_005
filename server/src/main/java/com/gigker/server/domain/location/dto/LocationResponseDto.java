package com.gigker.server.domain.location.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class LocationResponseDto {
    private String cityName;
}
