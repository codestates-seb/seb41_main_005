package com.gigker.server.domain.workTime.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import com.gigker.server.domain.workTime.dto.WorkTimeResponseDto;
import com.gigker.server.domain.workTime.entity.WorkTime;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface WorkTimeMapper {

	WorkTimeResponseDto workTimeToResponse(WorkTime workTime);
}
