package com.gigker.server.domain.schedule.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gigker.server.domain.content.entity.ContentApply;
import com.gigker.server.domain.member.entity.Member;
import com.gigker.server.domain.member.service.MemberService;
import com.gigker.server.domain.schedule.dto.ScheduleResponseDto;
import com.gigker.server.domain.schedule.mapper.ScheduleMapper;
import com.gigker.server.domain.schedule.service.ScheduleService;
import com.gigker.server.global.dto.SingleResponseDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/members/{member-id}/schedule")
public class ScheduleController {
	private final ScheduleService scheduleService;
	private final ScheduleMapper scheduleMapper;
	private final MemberService memberService;

	@GetMapping
	public ResponseEntity getSchedule(@PathVariable("member-id") Long memberId) {

		Member member = memberService.getCurrentMember();
		List<ContentApply> schedules = scheduleService.findAllSchedule(memberId, member);
		List<ScheduleResponseDto> responses = scheduleMapper.appliesToResponses(schedules);

		return ResponseEntity.ok().body(new SingleResponseDto<>(responses));
	}
}
