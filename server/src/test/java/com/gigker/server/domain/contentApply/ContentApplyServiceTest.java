package com.gigker.server.domain.contentApply;

import static com.gigker.server.domain.stub.ContentApplyStubData.*;
import static com.gigker.server.domain.stub.ContentStubData.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.*;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.transaction.annotation.Transactional;

import com.gigker.server.domain.content.entity.Content;
import com.gigker.server.domain.content.entity.ContentApply;
import com.gigker.server.domain.content.repository.ContentApplyRepository;
import com.gigker.server.domain.content.service.ContentApplyService;
import com.gigker.server.domain.member.entity.Member;
import com.gigker.server.global.exception.BusinessLogicException;
import com.gigker.server.global.exception.ExceptionCode;

@ExtendWith(MockitoExtension.class)
@DisplayName("신청 기능 테스트")
public class ContentApplyServiceTest {
	private final List<ContentApply> applies = getApplies();

	@InjectMocks
	ContentApplyService applyService;

	@Mock
	ContentApplyRepository applyRepository;

	@AfterEach
	void clean() {
		applyRepository.deleteAll();
	}

	// == Find ==
	@Transactional
	@Test
	@DisplayName("해당 ApplyId가 존재하는지 확인")
	void findVerifiedApply() throws Exception {
		given(applyRepository.findById(anyLong())).willReturn(Optional.of(getApply()));

		assertDoesNotThrow(() -> applyService.findVerifiedApply(1L));
	}

	// == Create ==

	@Test
	@DisplayName("해당 글이 모집 중인지 확인")
	void isContentRecruiting() throws Exception {
		Content content = getContent();
		Content matchedContent = getMatchedContent();

		assertEquals(content.getStatus(), Content.Status.RECRUITING);
		assertNotEquals(matchedContent.getStatus(), Content.Status.RECRUITING);
	}

	@Test
	@DisplayName("신청자가 글 작성자인지 확인")
	void verifyApplicantEqualsToWriter() throws Exception {
		ContentApply normalApply = applies.get(1);
		ContentApply writerApply = applies.get(0);
		Content content = writerApply.getContent();

		assertEquals(writerApply.getApplicant().getMemberId(), content.getMember().getMemberId());
		assertNotEquals(normalApply.getApplicant().getMemberId(), content.getMember().getMemberId());
	}

	@Transactional
	@Test
	@DisplayName("해당 글에 이미 신청 내역이 있는지 확인")
	void verifyExistMemberApply() throws Exception {
		ContentApply apply = applies.get(0);
		Member applicant = apply.getApplicant();
		Content content = apply.getContent();

		given(applyRepository.findByApplicantAndContent(any(Member.class), any(Content.class)))
			.willReturn(Optional.of(apply));

		BusinessLogicException ex = assertThrows(BusinessLogicException.class,
			() -> applyService.verifyExistMemberApply(applicant, content));

		assertEquals(ex.getExceptionCode(), ExceptionCode.EXISTS_APPLY);
	}

	// == Accept ==

	@Test
	@DisplayName("아직 지원 요청이 승인된 상태가 아닌지 확인")
	void isApplyStatusNone() throws Exception {
		ContentApply apply = getApply();
		ContentApply matchedApply = getMatchedApply();

		assertEquals(apply.getApplyStatus(), ContentApply.ApplyStatus.NONE);
		assertNotEquals(matchedApply.getApplyStatus(), ContentApply.ApplyStatus.NONE);
	}
}
