package com.gigker.server.domain.content.service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
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
		// Member, Content 유효성 검사
		Member applicant = memberService.findMemberById(apply.getApplicant().getMemberId());
		Content content = contentService.findContentByContentId(apply.getContent().getContentId());

		// 모집 중인 게시글인지 확인
		if (isContentRecruiting(content)) {
			verifyApplicantEqualToWriter(applicant, content);  // 신청자가 작성자인지 확인
			verifyExistMemberApply(applicant, content);	 // 이미 신청한 기록이 있는지 확인
		} else {
			throw new BusinessLogicException(ExceptionCode.BAD_REQUEST_RECRUITING);
		}

		return applyRepository.save(apply);
	}

	@Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.SERIALIZABLE)
	public ContentApply acceptApply(Long applyId) {
		// TODO: 추후 토큰의 memberId와 content.member.memberId 비교하는 로직 추가 (작성자만 승인 가능)
		ContentApply apply = findVerifiedApply(applyId);

		// ApplyStatus 가 None 인지 확인
		if (isApplyStatusNone(apply)) {
			// TODO: accept 할 경우 contentId가 다른 경우에도 승인이 되는 오류가 생긴다.
			apply.accept();
			// accept 할 경우 글의 상태도 "모집 완료"로 변경
			apply.getContent().setStatus(Content.Status.MATCHED);
		} else {
			throw new BusinessLogicException(ExceptionCode.EXISTS_APPLY);
		}

		otherApplicantsAutoDelete(apply.getContent());

		return apply;
	}

	public ContentApply findApply(Long applyId) {

		return findVerifiedApply(applyId);
	}

	public Page<ContentApply> findAllApplies(Long contentId, int page, int size) {
		Content content = contentService.findContentByContentId(contentId);

		return applyRepository.findAllByContent(content,
			PageRequest.of(page, size, Sort.by("contentApplyId").descending()));
	}

	public void deleteApply(Long applyId) {
		ContentApply apply = findVerifiedApply(applyId);

		applyRepository.delete(apply);
	}

	// == Find ==

	// 해당 ApplyId가 존재하는지 확인
	@Transactional(readOnly = true)
	public ContentApply findVerifiedApply(Long contentApplyId) {
		Optional<ContentApply> optionalApply = applyRepository.findById(contentApplyId);

		ContentApply findApply =
			optionalApply.orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_FOUND_APPLY));

		return findApply;
	}

	// == Create ==

	// 해당 글이 모집 중인 글인지 확인
	private boolean isContentRecruiting(Content content) {

		return Objects.equals(content.getStatus(), Content.Status.RECRUITING);
	}

	// 신청자가 글 작성자인지 확인
	private void verifyApplicantEqualToWriter(Member applicant, Content content) {
		if (Objects.equals(applicant.getMemberId(), content.getMember().getMemberId())) {
			throw new BusinessLogicException(ExceptionCode.BAD_REQUEST_APPLY);
		}
	}

	// 해당 글에 이미 신청내역이 있는지 확인
	private void verifyExistMemberApply(Member applicant, Content content) {
		Optional<ContentApply> optionalApply = applyRepository.findByApplicantAndContent(applicant, content);

		if (optionalApply.isPresent()) {
			throw new BusinessLogicException(ExceptionCode.EXISTS_APPLY);
		}
	}

	// == Accept ==

	// 아직 지원 요청이 승인된 상태가 아닌지 확인
	private boolean isApplyStatusNone(ContentApply apply) {

		return Objects.equals(apply.getApplyStatus(), ContentApply.ApplyStatus.NONE);
	}

	// Accept 요청 발생 시, 나머지 지원자들 자동 취소 기능
	private void otherApplicantsAutoDelete(Content content) {
		List<ContentApply> contents = applyRepository.findAllByContent(content);

		contents.stream()
			.filter(a -> a.getApplyStatus() == ContentApply.ApplyStatus.NONE)
			.mapToLong(ContentApply::getContentApplyId)
			.forEach(this::deleteApply);
	}
}
