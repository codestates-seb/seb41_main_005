//package com.gigker.server.domain.contentApply;
//
//import static com.gigker.server.domain.stub.ContentApplyStubData.*;
//import static com.gigker.server.domain.stub.ContentStubData.*;
//import static com.gigker.server.domain.stub.MemberStubData.*;
//import static org.junit.jupiter.api.Assertions.*;
//
//import java.util.List;
//
//import org.junit.jupiter.api.BeforeAll;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.TestInstance;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.transaction.annotation.Transactional;
//
//import com.gigker.server.domain.content.entity.Content;
//import com.gigker.server.domain.content.entity.ContentApply;
//import com.gigker.server.domain.content.repository.ContentApplyRepository;
//import com.gigker.server.domain.content.repository.ContentRepository;
//import com.gigker.server.domain.content.service.ContentApplyService;
//import com.gigker.server.domain.content.service.ContentService;
//import com.gigker.server.domain.member.entity.Member;
//import com.gigker.server.domain.member.repository.MemberRepository;
//import com.gigker.server.domain.member.service.MemberService;
//import com.gigker.server.global.exception.BusinessLogicException;
//import com.gigker.server.global.exception.ExceptionCode;
//
//// @ActiveProfiles("local")
//@SpringBootTest
//@DisplayName("신청 기능 테스트")
//@TestInstance(TestInstance.Lifecycle.PER_CLASS)
//public class ContentApplyServiceTest {
//	private ContentApply badRequestApply;
//	private ContentApply matchedApply;
//	private List<ContentApply> existApplies;
//
//	@Autowired
//	MemberService memberService;
//
//	@Autowired
//	ContentService contentService;
//
//	@Autowired
//	ContentApplyService applyService;
//
//	@Autowired
//	MemberRepository memberRepository;
//
//	@Autowired
//	ContentRepository contentRepository;
//
//	@Autowired
//	ContentApplyRepository applyRepository;
//
//	@BeforeAll
//	void beforeAll() {
//		cleanRepository();
//
//		List<Member> members = getMembers();
//		memberRepository.saveAll(members);
//
//		Content content = getContent();
//		Content matchedContent = getMatchedContent();
//		contentRepository.saveAll(List.of(content, matchedContent));
//
//		// 작성자 ID와 신청자 ID가 동일한 Apply
//		badRequestApply = getApply();
//
//		// 매칭된 Apply
//		matchedApply = getMatchedApply();
//
//		// 이미 지원한 Apply 리스트
//		existApplies = getApplies();
//		applyRepository.saveAll(existApplies);
//	}
//
//	void cleanRepository() {
//		memberRepository.deleteAll();
//		contentRepository.deleteAll();
//		applyRepository.deleteAll();
//	}
//
//	// == Create ==
//
//	@Test
//	void 존재하는_회원인지_검사한다() throws Exception {
//		// given
//		Long memberId = 10L;
//
//		// when then
//		BusinessLogicException ex = assertThrows(BusinessLogicException.class,
//			() -> memberService.findMemberById(memberId));
//
//		assertEquals(ExceptionCode.NOT_FOUND_MEMBER, ex.getExceptionCode());
//	}
//
//	@Test
//	void 존재하는_게시글인지_검사한다() throws Exception {
//		// given
//		Long contentId = 10L;
//
//		// when then
//		BusinessLogicException ex = assertThrows(BusinessLogicException.class,
//			() -> contentService.findContentByContentId(contentId));
//
//		assertEquals(ExceptionCode.NOT_FOUND_CONTENT, ex.getExceptionCode());
//	}
//
//	@Transactional
//	@Test
//	void 모집_중인_게시글인지_검사한다() throws Exception {
//		BusinessLogicException ex = assertThrows(BusinessLogicException.class,
//			() -> applyService.createApply(matchedApply));
//
//		assertEquals(ExceptionCode.BAD_REQUEST_RECRUITING, ex.getExceptionCode());
//	}
//
//	@Transactional
//	@Test
//	void 지원자가_작성자인지_검사한다() throws Exception {
//		BusinessLogicException ex = assertThrows(BusinessLogicException.class,
//			() -> applyService.createApply(badRequestApply));
//
//		assertEquals(ExceptionCode.BAD_REQUEST_APPLY, ex.getExceptionCode());
//	}
//
//	@Transactional
//	@Test
//	void 이미_지원했는지_검사한다() throws Exception {
//		// then
//		BusinessLogicException ex = assertThrows(BusinessLogicException.class,
//			() -> applyService.createApply(existApplies.get(0)));
//
//		assertEquals(ExceptionCode.EXISTS_APPLY, ex.getExceptionCode());
//	}
//
//	// == Accept ==
//
//	@Test
//	void 존재하는_지원인지_확인한다() throws Exception {
//		// given
//		Long applyId = 10L;
//
//		// when then
//		BusinessLogicException ex = assertThrows(BusinessLogicException.class,
//			() -> applyService.findVerifiedApply(applyId));
//
//		assertEquals(ExceptionCode.NOT_FOUND_APPLY, ex.getExceptionCode());
//	}
//
//	@Transactional
//	@Test
//	void 이미_승인된_게시글인지_확인한다() throws Exception {
//		// given
//		applyRepository.save(matchedApply);
//		Long matchedApplyId = matchedApply.getContentApplyId();
//
//		// when then
//		BusinessLogicException ex = assertThrows(BusinessLogicException.class,
//			() -> applyService.acceptApply(matchedApplyId));
//
//		assertEquals(ExceptionCode.EXISTS_APPLY, ex.getExceptionCode());
//	}
//
//	@Transactional
//	@Test
//	void 지원요청_승인_시_나머지_지원자는_자동취소_됐는지_확인한다() throws Exception {
//		// given
//		Long applyId = existApplies.get(0).getContentApplyId();
//
//		// when
//		applyService.acceptApply(applyId);
//		ContentApply apply = applyRepository.findById(applyId).get();
//
//		// then
//		// 지원 요청이 승인 됐는지 확인
//		assertEquals(apply.getApplyStatus(), ContentApply.ApplyStatus.MATCH);
//
//		// 나머지 지원자 자동취소 됐는지 확인
//		assertEquals(1, applyRepository.findAll().size());
//
//		// 해당 글의 상태가 모집 완료로 변경 됐는지 확인
//		assertEquals(apply.getContent().getStatus(), Content.Status.MATCHED);
//	}
//}
