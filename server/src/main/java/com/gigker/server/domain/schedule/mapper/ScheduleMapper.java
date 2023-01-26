package com.gigker.server.domain.schedule.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import com.gigker.server.domain.common.WorkTimeMapper;
import com.gigker.server.domain.content.entity.ContentApply;
import com.gigker.server.domain.schedule.dto.ScheduleResponseDto;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE,
	uses = WorkTimeMapper.class)
public interface ScheduleMapper {
	@Mapping(source = "apply.content.contentId", target = "contentId")
	@Mapping(source = "apply.content.title", target = "title")
	@Mapping(source = "apply.content.contentType", target = "contentType")
	@Mapping(source = "apply.content.recruitingCount", target = "recruitingCount")
	@Mapping(source = "apply.content.price", target = "price")
	@Mapping(source = "apply.content.workTimes", target = "workTimes")
	List<ScheduleResponseDto> applyToResponse(List<ContentApply> applies);
}
