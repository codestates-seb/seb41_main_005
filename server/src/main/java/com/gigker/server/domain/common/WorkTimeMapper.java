package com.gigker.server.domain.common;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring" , unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface WorkTimeMapper {

	WorkTimeResponseDto workTimeToResponse(WorkTime workTime);
}
