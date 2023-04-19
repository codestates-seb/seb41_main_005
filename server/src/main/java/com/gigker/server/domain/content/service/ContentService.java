package com.gigker.server.domain.content.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gigker.server.domain.category.entity.Category;
import com.gigker.server.domain.common.ContentType;
import com.gigker.server.domain.common.CustomBeanUtils;
import com.gigker.server.domain.content.entity.Content;
import com.gigker.server.domain.content.repository.ContentRepository;
import com.gigker.server.domain.location.entity.Location;
import com.gigker.server.domain.member.entity.Member;
import com.gigker.server.domain.member.service.MemberService;
import com.gigker.server.global.exception.BusinessLogicException;
import com.gigker.server.global.exception.ExceptionCode;

import lombok.RequiredArgsConstructor;

@Transactional
@RequiredArgsConstructor
@Service
public class ContentService {
	private final ContentRepository contentRepository;
	private final MemberService memberService;
	private final CustomBeanUtils<Content> beanUtils;

	public Content createContent(Content content, Category category, Location location) {
		Member member = memberService.getCurrentMember();
		content.setCategory(category);
		content.setMember(member);
		content.setLocation(location);
		return contentRepository.save(content);
	}

	public Content updateContent(Content content, Category category, Location location) //throws BusinessLogicException
	{
		Content findContent = findContentByContentId(content.getContentId());
		//findContent(대상)에 대한 수정요청자 권한 검증, 글 작성자가 아닌경우 400 예외코드
		if (findContent.getMember().getMemberId() != memberService.getCurrentMember().getMemberId())
			throw new BusinessLogicException(ExceptionCode.NO_PERMISSION);
		//NOT Null 속성값을 수정하지 않으면 기존 게시물의 속성을 그대로 사용
		content.setCategory(category);
		content.setLocation(location);
		Content updateContent = beanUtils.copyNonNullProperties(content, findContent);

		return contentRepository.save(updateContent);
	}

	public Content findContentByContentId(long contentId) {
		return contentRepository.findById(contentId)
			.orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_FOUND_CONTENT));
	}

	public Content findVerifiedContent(long contentId) {
		Optional<Content> optionalContent = contentRepository.findById(contentId);

		Content findContent =
			optionalContent.orElseThrow(() ->
				new BusinessLogicException(ExceptionCode.NOT_FOUND_CONTENT));
		return findContent;
	}

	public List<Content> findContentsByContentType(ContentType contentType) {
		// 모집 중인 게시글만 조회한다.
		return contentRepository.findAllByStatusAndContentType(Content.Status.RECRUITING, contentType);
	}

	public void deleteContent(long contentId) {
		Content findContent = findVerifiedContent(contentId);
		if (findContent.getMember().getMemberId() != memberService.getCurrentMember().getMemberId())
			throw new BusinessLogicException(ExceptionCode.NO_PERMISSION);
		contentRepository.delete(findContent);
	}

	public List<Content> findContentsByCategory(Category category) {
		return contentRepository.findContentsByCategory(category);
	}
}
