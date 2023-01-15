package com.gigker.server.domain.tag.controller;

import com.gigker.server.domain.tag.dto.TagPostDto;
import com.gigker.server.domain.tag.entity.Tag;
import com.gigker.server.domain.tag.mapper.TagMapper;
import com.gigker.server.domain.tag.repository.TagRepository;
import com.gigker.server.domain.tag.service.TagService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping("/tags")
public class TagController {

    private final TagRepository tagRepository;

    @PostMapping
    public ResponseEntity tagPostDtoToTag(@Valid @RequestBody Tag tag) {
        tagRepository.save(tag);
        return new ResponseEntity<>(
                HttpStatus.CREATED
        );
    }
}
