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
import javax.validation.constraints.Positive;
import java.util.Arrays;
import java.util.Objects;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/contents")
public class ContentController {
    private final ContentService contentService;
    private final ContentMapper contentMapper;

    @PostMapping
    public ResponseEntity contentPostDtoToContent(@Valid @RequestBody ContentDto.Post contentPostDto) {
        Content content = contentMapper.contentPostDtoToContent(contentPostDto);
        Content createContent = contentService.createContent(content);

//        return new ResponseEntity<>(
//                new SingleResponseDto<>(contentMapper.contentToContentResponseDto(content)), HttpStatus.CREATED
//        );
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PatchMapping("/{content_id}")
    public ResponseEntity patchContent(@Valid @RequestBody ContentDto.Patch contentPatch,
                                        @PathVariable("content_id") @Positive long contentId) {
        contentPatch.setContentId(contentId);

        Content content = contentMapper.contentPatchDtoToContent(contentPatch);
        Content updateContent = contentService.updateContent(content); // DB 업데이트
//        ContentDto.Response response = contentMapper.contentDtoToContent(updateContent);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
