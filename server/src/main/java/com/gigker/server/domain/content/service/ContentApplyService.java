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

import com.gigker.server.domain.common.ContentType;
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
	private final ContentService contentService;

	@Transactional
	public ContentApply createApply(Long contentId, Member applicant) {
		// Content 유효성 검사
		Content content = getContentByContentId(contentId);

		// 모집 중인 게시글인지 확인
		if (isContentRecruiting(content)) {
			verifyApplicantEqualToWriter(applicant, content);  // 신청자가 작성자인지 확인
			verifyExistMemberApply(applicant, content);     // 이미 신청한 기록이 있는지 확인
		} else {
			throw new BusinessLogicException(ExceptionCode.BAD_REQUEST_RECRUITING);
		}

		ContentApply apply = ContentApply.builder()
			.applicant(applicant)
			.content(content)
			.build();

		return applyRepository.save(apply);
	}

	@Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.SERIALIZABLE)
	public void acceptApply(Long applyId, Long contentId, Member writer) {
		ContentApply apply = findVerifiedApply(applyId);

		// 정상적인 접근인지 확인
		if (!Objects.equals(apply.getContent().getContentId(), contentId)) {
			throw new BusinessLogicException(ExceptionCode.BAD_REQUEST);
		}

		// 로그인한 사용자가 글 작성자인지 확인
		if (isMemberEqualsToWriter(writer, apply.getContent())) {
			throw new BusinessLogicException(ExceptionCode.EDIT_NOT_ALLOWED);
		}

		// ApplyStatus 가 None 인지 확인
		if (isApplyStatusNone(apply)) {
			apply.accept();
			// accept 할 경우 글의 상태도 "모집 완료"로 변경
			apply.getContent().setStatus(Content.Status.MATCHED);
		} else {
			throw new BusinessLogicException(ExceptionCode.EXISTS_APPLY);
		}

		otherApplicantsAutoDelete(apply.getContent());
	}

	// TODO: 테스트를 위한 코드 (추후 삭제)
	@Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.SERIALIZABLE)
	public void completeApply(Long applyId) {
		ContentApply apply = findVerifiedApply(applyId);
		apply.complete();
		apply.getContent().setStatus(Content.Status.COMPLETED);
	}

	@Transactional
	public ContentApply findApply(Long applyId, Long contentId, Member writer) {
		ContentApply apply = findVerifiedApply(applyId);

		// 정상적인 접근인지 확인
		if (!Objects.equals(apply.getContent().getContentId(), contentId)) {
			throw new BusinessLogicException(ExceptionCode.BAD_REQUEST);
		}

		// 작성자만 조회 가능
		if (isMemberEqualsToWriter(writer, apply.getContent())) {
			throw new BusinessLogicException(ExceptionCode.ACCESS_NOT_ALLOWED);
		}

		return apply;
	}

	@Transactional
	public Page<ContentApply> findAllApplies(Content content, Member writer, int page, int size) {
		// 작성자만 조회 가능
		if (isMemberEqualsToWriter(writer, content)) {
			throw new BusinessLogicException(ExceptionCode.ACCESS_NOT_ALLOWED);
		}
		return applyRepository.findAllByContent(content,
			PageRequest.of(page, size, Sort.by("lastModifiedAt").descending()));
	}

	@Transactional
	public void deleteApply(Long applyId, Long contentId, Member applicant) {
		ContentApply apply = findVerifiedApply(applyId);

		// 정상적인 접근인지 확인
		if (!Objects.equals(apply.getContent().getContentId(), contentId)) {
			throw new BusinessLogicException(ExceptionCode.BAD_REQUEST);
		}

		// 지원자만 취소 가능
		if (isMemberEqualsToApplicant(applicant, apply)) {
			throw new BusinessLogicException(ExceptionCode.DELETE_NOT_ALLOWED);
		}

		// 만약 이미 매칭된 후에 취소했다면, 게시글 상태를 다시 모집 중으로 변경
		if (apply.getApplyStatus() == ContentApply.ApplyStatus.MATCH) {
			apply.getContent().setStatus(Content.Status.RECRUITING);
		}

		applyRepository.delete(apply);
	}

	// 특정 회원의 게시글 타입별 완료 건수 조회
	public Long countComplete(Member member, ContentType type) {
		return applyRepository.countByApplicantAndContentType(member, type);
	}

	// 특정 회원의 전체 완료 건수 조회
	public Long countTotalComplete(Member member) {
		return applyRepository.countByApplicant(member);
	}

	// == Find ==

	// 해당 ApplyId가 존재하는지 확인
	@Transactional(readOnly = true)
	public ContentApply findVerifiedApply(Long contentApplyId) {
		Optional<ContentApply> optionalApply = applyRepository.findById(contentApplyId);

		return optionalApply.orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_FOUND_APPLY));
	}

	// 로그인한 사용자가 게시글 작성자가 아닌지 확인
	private boolean isMemberEqualsToWriter(Member member, Content content) {
		return !Objects.equals(member.getMemberId(), content.getMember().getMemberId());
	}

	// 로그인한 사용자가 지원자가 아닌지 확인
	private boolean isMemberEqualsToApplicant(Member member, ContentApply apply) {
		return !Objects.equals(member.getMemberId(), apply.getApplicant().getMemberId());
	}

	public Content getContentByContentId(Long contentId) {
		return contentService.findContentByContentId(contentId);
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
	public void verifyExistMemberApply(Member applicant, Content content) {
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
			.forEach(applyRepository::deleteById);
	}
}
