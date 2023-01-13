package com.gigker.server.domain.content.controller;

import com.gigker.server.domain.content.dto.ContentPatchDto;
import com.gigker.server.domain.content.dto.ContentPostDto;
import com.gigker.server.domain.content.entity.Content;
import com.gigker.server.domain.content.mapper.ContentMapper;
import com.gigker.server.domain.content.service.ContentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@RequiredArgsConstructor
@RequestMapping("/contents")
public class ContentController {
    private final ContentService contentService;
    private final ContentMapper contentMapper;

    @PostMapping
    public ResponseEntity contentPostDtoToContent(@Valid @RequestBody ContentPostDto contentPostDto) {
        Content content = contentMapper.contentPostDtoToContent(contentPostDto);
        Content createContent = contentService.createContent(content);

//        return new ResponseEntity<>(
//                new SingleResponseDto<>(contentMapper.contentToContentResponseDto(content)), HttpStatus.CREATED
//        );
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PatchMapping("/{content_id}")
    public ResponseEntity patchContentDtoToContent(@Valid @RequestBody ContentPatchDto contentPatchDto,
                                        @PathVariable("content_id") @Positive long contentId) {
        contentPatchDto.setContentId(contentId);

        Content content = contentMapper.contentPatchDtoToContent(contentPatchDto);
        Content updateContent = contentService.updateContent(content); // DB 업데이트
//        Content contentReponseDto = contentMapper.contentDtoToContent(updateContent);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
