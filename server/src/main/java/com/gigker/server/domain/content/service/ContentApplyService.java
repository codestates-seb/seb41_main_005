package com.gigker.server.domain.content.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.gigker.server.domain.content.entity.Content;
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
public class ContentApplyService {
	private final ContentApplyRepository applyRepository;
	private final MemberService memberService;
	private final ContentService contentService;

	@Transactional
	public ContentApply createApply(ContentApply apply) {
		// Member, Content, ContentApply 유효성 검사
		Member member = memberService.findMemberById(apply.getApplicant().getMemberId());
		Content content = contentService.findContentByContentId(apply.getContent().getContentId());
		verifyExistMemberApply(member, content);

		return applyRepository.save(apply);
	}

	@Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.SERIALIZABLE)
	public ContentApply acceptApply(Long applyId) {
		// TODO: 추후 토큰의 memberId와 content.member.memberId 비교하는 로직 추가 (작성자만 승인 가능)
		ContentApply apply = findVerifiedApply(applyId);

		// 중복하여 변경 시도 시 throw Exception
		if (apply.getApplyStatus() == ContentApply.ApplyStatus.NONE) {
			apply.accept();
		} else
			throw new BusinessLogicException(ExceptionCode.EXISTS_APPLY);

		otherApplicantsAutoDelete(apply.getContent());

		return apply;
	}

	public ContentApply findApply(Long applyId) {

		return findVerifiedApply(applyId);
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
			throw new BusinessLogicException(ExceptionCode.EXISTS_APPLY);
		}
	}

	// Accept 요청 발생 시, 나머지 지원자들 자동 취소 기능
	private void otherApplicantsAutoDelete(Content content) {
		List<ContentApply> contents = applyRepository.findAllByContent(content);

		contents.stream()
			.mapToLong(ContentApply::getContentApplyId)
			.forEach(this::deleteApply);
	}
}
