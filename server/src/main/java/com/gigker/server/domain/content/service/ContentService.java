package com.gigker.server.domain.content.service;

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
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
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

    //    public Content createContent(Content content) {
//        Member member = memberService.findMemberById(memberService.getCurrentMember().getMemberId());
//        List<Tag> tags = tagService.findAllBy(content.getNames());
////        List<Long> tagIdList = new ArrayList<>();
////        for (int i = 0; i < content.getContentTags().size(); i++) {
////            tagIdList.add(content.getContentTags().get(i).getTag().getTagId());
////        }
//        content.setMember(member);
////        contentTagRepository.save(new ContentTag());
//
//        return contentRepository.save(content);
//    }
    public Content createContent(Content content) {
        Member member = memberService.findMemberById(memberService.getCurrentMember().getMemberId());
        content.setMember(member);
        Content saveContent = contentRepository.save(content);
        return saveContent;
    }

    public Content updateContent(Content content) //throws BusinessLogicException
    {
        Content findContent = findContentByContentId(content.getContentId());
////findContent(대상)에 대한 수정요청자 권한 검증, 글 작성자가 아닌경우 400 예외코드
//        if(findContent.getMember().getMemberId() != getCurrentMember().getMemberId())
//            throw new BusinessLogicException(ExceptionCode.NO_PERMISSION);
////NOT Null 속성값을 수정하지 않으면 기존 게시물의 속성을 그대로 사용
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
        return contentRepository.findContentsByContentType(contentType);
    }

    public Content findContent(long contentId){
        return findVerifiedContent(contentId);
    }

    public void deleteContent(long contentId) {
        Content findContent = findVerifiedContent(contentId);
//        if(findContent.getMember().getMemberId() != getCurrentMember().getMemberId())
//            throw new BusinessLogicException(ExceptionCode.NO_PERMISSION);
        contentRepository.delete(findContent);
    }
    private Content save(Content content) {
        return contentRepository.save(content);
    }
}