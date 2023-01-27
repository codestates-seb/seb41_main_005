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
	@Mapping(source = "content.contentId", target = "contentId")
	@Mapping(source = "content.title", target = "title")
	@Mapping(source = "content.contentType", target = "contentType")
	@Mapping(source = "content.recruitingCount", target = "recruitingCount")
	@Mapping(source = "content.price", target = "price")
	@Mapping(source = "content.workTimes", target = "workTimes")
	ScheduleResponseDto applyToResponse(ContentApply apply);

	List<ScheduleResponseDto> appliesToResponses(List<ContentApply> applies);
}
