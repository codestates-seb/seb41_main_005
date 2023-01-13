package com.gigker.server.domain.contentApply.service;

import static com.gigker.server.domain.stub.ContentApplyStubData.*;
import static com.gigker.server.domain.stub.ContentStubData.*;
import static com.gigker.server.domain.stub.MemberStubData.*;
import static org.junit.jupiter.api.Assertions.*;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.gigker.server.domain.content.entity.Content;
import com.gigker.server.domain.content.entity.ContentApply;
import com.gigker.server.domain.content.repository.ContentApplyRepository;
import com.gigker.server.domain.content.repository.ContentRepository;
import com.gigker.server.domain.content.service.ContentApplyService;
import com.gigker.server.domain.content.service.ContentService;
import com.gigker.server.domain.member.entity.Member;
import com.gigker.server.domain.member.repository.MemberRepository;
import com.gigker.server.domain.member.service.MemberService;
import com.gigker.server.global.exception.BusinessLogicException;
import com.gigker.server.global.exception.ExceptionCode;

// @ActiveProfiles("local")
@SpringBootTest
@DisplayName("신청 기능 테스트")
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class ContentApplyServiceTest {
	private List<Member> members;
	private Content content;
	private ContentApply badRequestApply;
	private List<ContentApply> existApplies;

	@Autowired
	MemberService memberService;

	@Autowired
	ContentService contentService;

	@Autowired
	ContentApplyService applyService;

	@Autowired
	MemberRepository memberRepository;

	@Autowired
	ContentRepository contentRepository;

	@Autowired
	ContentApplyRepository applyRepository;

	@BeforeAll
	void beforeAll() {
		cleanRepository();

		members = getMembers();
		memberRepository.saveAll(members);

		content = getContent();
		contentRepository.save(content);

		badRequestApply = getApply();
		existApplies = getApplies();
		applyRepository.saveAll(existApplies);
	}

	void cleanRepository() {
		memberRepository.deleteAll();
		contentRepository.deleteAll();
		applyRepository.deleteAll();
	}

	@Nested
	@DisplayName("게시글에 지원")
	@TestInstance(TestInstance.Lifecycle.PER_CLASS)
	class Create {
		@Test
		void 존재하는_회원인지_검사한다() throws Exception {
			// given
			Long memberId = 10L;

			// when then
			BusinessLogicException ex = assertThrows(BusinessLogicException.class,
				() -> memberService.findMemberById(memberId));

			assertEquals(ExceptionCode.NOT_FOUND_MEMBER, ex.getExceptionCode());
		}

		@Test
		void 존재하는_게시글인지_검사한다() throws Exception {
			// given
			Long contentId = 10L;

			// when then
			BusinessLogicException ex = assertThrows(BusinessLogicException.class,
				() -> contentService.findContentByContentId(contentId));

			assertEquals(ExceptionCode.NOT_FOUND_CONTENT, ex.getExceptionCode());
		}

		@Test
		void 지원자가_작성자인지_검사한다() throws Exception {
			BusinessLogicException ex = assertThrows(BusinessLogicException.class,
				() -> applyService.createApply(badRequestApply));

			assertEquals(ExceptionCode.BAD_REQUEST_APPLY, ex.getExceptionCode());
		}

		@Test
		void 이미_지원했는지_검사한다() throws Exception {
			// then
			BusinessLogicException ex = assertThrows(BusinessLogicException.class,
				() -> applyService.createApply(existApplies.get(0)));

			assertEquals(ExceptionCode.EXISTS_APPLY, ex.getExceptionCode());
		}
	}

	@Nested
	@DisplayName("지원 요청 승인")
	@TestInstance(TestInstance.Lifecycle.PER_CLASS)
	class Accept {
		@Test
		void 존재하는_지원인지_확인한다() throws Exception {
			// given
			Long applyId = 10L;

			// when then
			BusinessLogicException ex = assertThrows(BusinessLogicException.class,
				() -> applyService.findVerifiedApply(applyId));

			assertEquals(ExceptionCode.NOT_FOUND_APPLY, ex.getExceptionCode());
		}

		@Test
		void 지원요청_승인_시_나머지_지원자는_자동취소_됐는지_확인한다() throws Exception {
			// given
			Long applyId = existApplies.get(0).getContentApplyId();

			// when
			applyService.acceptApply(applyId);
			Optional<ContentApply> optionalApply = applyRepository.findById(applyId);

			// then
			// 지원 요청이 승인 됐는지 확인
			assertEquals(optionalApply.get().getApplyStatus(), ContentApply.ApplyStatus.MATCH);

			// 나머지 지원자 자동취소 됐는지 확인
			assertEquals(1, applyRepository.findAll().size());
		}

		@Test
		void 중복된_지원인지_확인한다() throws Exception {
			// given
			Long applyId = existApplies.get(0).getContentApplyId();

			// when then
			BusinessLogicException ex = assertThrows(BusinessLogicException.class,
				() -> applyService.acceptApply(applyId));

			assertEquals(ExceptionCode.EXISTS_APPLY, ex.getExceptionCode());
		}
	}
}
