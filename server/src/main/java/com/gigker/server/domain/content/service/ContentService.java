package com.gigker.server.domain.content.service;

import com.gigker.server.domain.content.entity.Content;
import com.gigker.server.domain.content.repository.ContentRepository;
import com.gigker.server.domain.common.CustomBeanUtils;
import com.gigker.server.domain.member.entity.Member;
import com.gigker.server.domain.member.repository.MemberRepository;
import com.gigker.server.domain.member.service.MemberService;
import com.gigker.server.global.exception.BusinessLogicException;
import com.gigker.server.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@RequiredArgsConstructor
@Service
public class ContentService {
    private final ContentRepository contentRepository;
    private final MemberService memberService;
    private final CustomBeanUtils beanUtils;

    public Content createContent(Content content) {
        Member member = memberService.findMemberById(content.getMember().getMemberId());
        content.setMember(member);

        return contentRepository.save(content);
    }

    public Content updateContent(Content content) {
//        Content findContent = findVerifiedContent(content.getContentId());
////findContent(대상)에 대한 수정요청자 권한 검증, 글 작성자가 아닌경우 400 예외코드
//        if(findContent.getMember().getMemberId() != getCurrentMember().getMemberId())
//            throw new BusinessLogicException(ExceptionCode.NO_PERMISSION);
////NOT Null 속성값을 수정하지 않으면 기존 게시물의 속성을 그대로 사용
//        Content updateContent = beanUtils.copyNonNullProperties(content, findContent);
//        updateContent.setTags(content.getTags());
        return null;
    }

    public Content findContentByContentId(long contentId) {
        return contentRepository.findById(contentId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_FOUND_CONTENT));
    }
}