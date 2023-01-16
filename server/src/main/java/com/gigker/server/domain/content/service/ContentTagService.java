package com.gigker.server.domain.content.service;

import com.gigker.server.domain.content.entity.ContentTag;
import com.gigker.server.domain.content.repository.ContentTagRepository;
import com.gigker.server.domain.tag.entity.Tag;
import com.gigker.server.domain.tag.service.TagService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Transactional
@RequiredArgsConstructor
@Service
public class ContentTagService {
    ContentTagRepository contentTagRepository;
//    public List<ContentTag> createContentTags(List<Tag> tags){
//    }
}
