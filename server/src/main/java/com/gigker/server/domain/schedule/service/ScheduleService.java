package com.gigker.server.domain.schedule.service;

import java.util.List;
import java.util.Objects;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gigker.server.domain.content.entity.ContentApply;
import com.gigker.server.domain.content.repository.ContentApplyRepository;
import com.gigker.server.domain.member.entity.Member;
import com.gigker.server.domain.member.service.MemberService;
import com.gigker.server.global.exception.BusinessLogicException;
import com.gigker.server.global.exception.ExceptionCode;

import lombok.RequiredArgsConstructor;

@Transactional
@Service
@RequiredArgsConstructor
public class ScheduleService {
	private final ContentApplyRepository applyRepository;
	private final MemberService memberService;

	@Transactional(readOnly = true)
	public List<ContentApply> findAllSchedule(Long memberId) {
		// JWT 토큰을 통한 회원 조회
		Member member = memberService.getCurrentMember();

		if (!Objects.equals(member.getMemberId(), memberId)) {
			throw new BusinessLogicException(ExceptionCode.NO_PERMISSION);
		}

		// 내가 신청한 스케쥴 목록 확인
		List<ContentApply> schedule = applyRepository.findAllByMatchedApplicant(member);

		return schedule;
	}
}
