package com.gigker.server.domain.content.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gigker.server.domain.content.entity.Content;
import com.gigker.server.domain.content.entity.ContentApply;
import com.gigker.server.domain.content.repository.ContentApplyRepository;
import com.gigker.server.domain.member.entity.Member;
import com.gigker.server.global.exception.BusinessLogicException;
import com.gigker.server.global.exception.ExceptionCode;

import lombok.RequiredArgsConstructor;

@Transactional
@Service
@RequiredArgsConstructor
public class ContentApplyService {
	private final ContentApplyRepository applyRepository;

	public ContentApply createApply() {

		return null;
	}

	public ContentApply acceptApply() {

		return null;
	}

	public ContentApply findApply() {

		return null;
	}

	public List<ContentApply> findAll() {

		return null;
	}

	public void deleteApply(Long applyId) {
		ContentApply apply = findVerifiedApply(applyId);

		applyRepository.delete(apply);
	}

	// 해당 ApplyId가 존재하는지 확인
	@Transactional(readOnly = true)
	public ContentApply findVerifiedApply(Long contentApplyId) {
		Optional<ContentApply> optionalApply = applyRepository.findById(contentApplyId);

		ContentApply findApply =
			optionalApply.orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_FOUND_APPLY));

		return findApply;
	}

	// 해당 글에 이미 신청내역이 있는지 확인
	private void verifyExistMemberApply(Member member, Content content) {
		Optional<ContentApply> optionalApply = applyRepository.findByApplicantAndContent(member, content);

		if (optionalApply.isPresent()) {
			throw new BusinessLogicException(ExceptionCode.APPLY_EXISTS);
		}
	}
}
