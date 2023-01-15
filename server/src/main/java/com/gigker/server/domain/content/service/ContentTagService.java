package com.gigker.server.domain.content.service;

import com.gigker.server.domain.content.entity.ContentTag;
import com.gigker.server.domain.content.repository.ContentTagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ContentTagService {
    ContentTagRepository contentTagRepository;
    public List<ContentTag> createContentTags(List<ContentTag> contentTags){
        return contentTags.stream().map(contentTag -> contentTagRepository.save(contentTag)).collect(Collectors.toList());
    }
}
