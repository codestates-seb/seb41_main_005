package com.gigker.server.domain.content.controller;

import com.gigker.server.domain.content.dto.ContentDto;
import com.gigker.server.domain.content.entity.Content;
import com.gigker.server.domain.content.mapper.ContentMapper;
import com.gigker.server.domain.content.service.ContentService;
import com.gigker.server.global.dto.SingleResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping("/contents")
public class ContentController {
    private final ContentService contentService;
    private final ContentMapper contentMapper;

    @PostMapping
    public ResponseEntity postContent(@Valid @RequestBody ContentDto.Post contentPostDto) {
        Content content = contentMapper.contentPostDtoToContent(contentPostDto);
        Content createContent = contentService.createContent(content);

//        return new ResponseEntity<>(
//                new SingleResponseDto<>(contentMapper.contentToContentResponseDto(content)), HttpStatus.CREATED
//        );
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}
