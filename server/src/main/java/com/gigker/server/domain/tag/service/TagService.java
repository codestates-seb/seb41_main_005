package com.gigker.server.domain.tag.service;

import com.gigker.server.domain.tag.entity.Tag;
import com.gigker.server.domain.tag.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@RequiredArgsConstructor
@Service
public class TagService {
    TagRepository tagRepository;
    public Tag createTag(Tag tag){
        return tagRepository.save(tag);
    }
//    public List<Tag> createTagList(List<Tag> tagList){
//        return tagList.stream().map(tag -> tagRepository.save(tag)).collect(Collectors.toList());
//    }
}