package com.gigker.server.domain.content.service;

import com.gigker.server.domain.category.entity.Category;
import com.gigker.server.domain.category.service.CategoryService;
import com.gigker.server.domain.common.ContentType;
import com.gigker.server.domain.content.entity.Content;
import com.gigker.server.domain.content.entity.ContentTag;
import com.gigker.server.domain.content.repository.ContentRepository;
import com.gigker.server.domain.common.CustomBeanUtils;
import com.gigker.server.domain.content.repository.ContentTagRepository;
import com.gigker.server.domain.member.entity.Member;
import com.gigker.server.domain.member.repository.MemberRepository;
import com.gigker.server.domain.member.service.MemberService;
import com.gigker.server.domain.tag.entity.Tag;
import com.gigker.server.domain.tag.service.TagService;
import com.gigker.server.global.exception.BusinessLogicException;
import com.gigker.server.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Transactional
@RequiredArgsConstructor
@Service
public class ContentService {
    private final ContentRepository contentRepository;
    private final MemberService memberService;
    private final CustomBeanUtils<Content> beanUtils;
    private final ContentTagRepository contentTagRepository;
    private final MemberRepository memberRepository;
    private final CategoryService categoryService;

    public Content createContent(Content content, Category category) {
        Member member = memberService.getCurrentMember();
        content.setCategory(category);
        content.setMember(member);
        Content saveContent = contentRepository.save(content);
        return saveContent;
    }

    public Content updateContent(Content content) //throws BusinessLogicException
    {
        Content findContent = findContentByContentId(content.getContentId());
//findContent(대상)에 대한 수정요청자 권한 검증, 글 작성자가 아닌경우 400 예외코드
        if(findContent.getMember().getMemberId() != memberService.getCurrentMember().getMemberId())
            throw new BusinessLogicException(ExceptionCode.NO_PERMISSION);
//NOT Null 속성값을 수정하지 않으면 기존 게시물의 속성을 그대로 사용
        Content updateContent = beanUtils.copyNonNullProperties(content, findContent);
        return contentRepository.save(updateContent);
    }

    public Content findContentByContentId(long contentId) {
        return contentRepository.findById(contentId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_FOUND_CONTENT));
    }

    public Content findVerifiedContent(long contentId){
        Optional<Content> optionalContent = contentRepository.findById(contentId);

        Content findContent =
                optionalContent.orElseThrow(()->
                        new BusinessLogicException(ExceptionCode.NOT_FOUND_CONTENT));
        return findContent;
    }

    public List<Content> findContents(){
        return contentRepository.findAll();
    }

    public List<Content> findContentsByContentType(ContentType contentType){
        // 모집 중인 게시글만 조회한다.
        return contentRepository.findAllByStatusAndContentType(Content.Status.RECRUITING, contentType);
    }

    public Content findContent(long contentId){
        return findVerifiedContent(contentId);
    }

    public void deleteContent(long contentId) {
        Content findContent = findVerifiedContent(contentId);
        if(findContent.getMember().getMemberId() != memberService.getCurrentMember().getMemberId())
            throw new BusinessLogicException(ExceptionCode.NO_PERMISSION);
        contentRepository.delete(findContent);
    }

    // 30분 마다 만료된 글을 찾아서 상태를 변경해준다.
    @Scheduled(cron = "2 0/30 * * * *")
    public void scheduledExpiry() {
        List<Content> contents = contentRepository.findAllByStatus(Content.Status.RECRUITING);

        for (Content content : contents) {
            // null 아니고, 마감 시간(0초)이 현재 시간(1초)보다 이후인가?
            if (content.getDeadLine() != null && content.getDeadLine().isAfter(LocalDateTime.now())) {
                content.setStatus(Content.Status.EXPIRED);
            }
        }
    }

    private Content save(Content content) {
        return contentRepository.save(content);
    }
}
