package com.gigker.server.domain.content.controller;

import com.gigker.server.domain.category.entity.Category;
import com.gigker.server.domain.category.service.CategoryService;
import com.gigker.server.domain.common.ContentType;
import com.gigker.server.domain.content.dto.ContentPatchDto;
import com.gigker.server.domain.content.dto.ContentPostDto;
import com.gigker.server.domain.content.entity.Content;
import com.gigker.server.domain.content.mapper.ContentMapper;
import com.gigker.server.domain.content.service.ContentService;
import com.gigker.server.domain.location.entity.Location;
import com.gigker.server.domain.location.service.LocationService;
import com.gigker.server.domain.review.service.ReviewService;
import com.gigker.server.global.dto.SingleResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/contents")
public class ContentController {
    private final ContentService contentService;
    private final ContentMapper contentMapper;
    private final CategoryService categoryService;
    private final LocationService locationService;
    private final ReviewService reviewService;

    @PostMapping
    public ResponseEntity postContent(@Valid @RequestBody ContentPostDto contentPostDto) {

        String categoryName = String.valueOf(contentPostDto.getCategoryName()); // Mapping
        Category findCategory = categoryService.findExistCategory(categoryName); // DB에 존재하는 카테고리인지 확인

        String cityName = String.valueOf(contentPostDto.getCityName());
        Location location = locationService.findExistLocation(cityName);
        Content content = contentMapper.contentPostDtoToContent(contentPostDto);
        Content createContent = contentService.createContent(content, findCategory, location); // service에서 Category를 Setter로 넣기

        return ResponseEntity.status(HttpStatus.CREATED).body(null);
    }

    @PatchMapping("/{content_id}")
    public ResponseEntity patchContentDtoToContent(@Valid @RequestBody ContentPatchDto contentPatchDto,
                                                   @PathVariable("content_id") Long contentId) {
        contentPatchDto.setContentId(contentId);

        String originalCategoryName = contentService.findContentByContentId(contentId).getCategory().getCategoryName();
        if (contentPatchDto.getCategoryName() == null){
            contentPatchDto.setCategoryName(originalCategoryName);
        }
        String originalCityName = contentService.findContentByContentId(contentId).getLocation().getCityName();
        if (contentPatchDto.getCityName() == null){
            contentPatchDto.setCityName(originalCityName);
        }

        Category findCategory = categoryService.findExistCategory(contentPatchDto.getCategoryName()); // DB에 존재하는 카테고리인지 확인
        //        String categoryName = String.valueOf(contentPatchDto.getCategoryName()); // Mapping
        String cityName = String.valueOf(contentPatchDto.getCityName());
        Location location = locationService.findExistLocation(cityName);
        Content content = contentMapper.contentPatchDtoToContent(contentPatchDto);
        contentService.updateContent(content, findCategory, location); // DB 업데이트

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/{content_id}")
    public ResponseEntity getContent(@PathVariable("content_id") long contentId){
        Content content = contentService.findVerifiedContent(contentId);
        Map<String, Long> count =
            reviewService.countProfile(content.getMember(), content.getContentType());

        return new ResponseEntity<>(
                new SingleResponseDto<>(contentMapper.contentResponseDto(content, count))
                ,HttpStatus.OK
        );
    }

    @GetMapping
    public ResponseEntity getContents(@RequestParam("contentType") ContentType contentType) {
        List<Content> contents = contentService.findContentsByContentType(contentType);
        return new ResponseEntity<>(
                (new SingleResponseDto<>(contentMapper.contentsResponseDto(contents))),
                HttpStatus.OK);
    }

    @DeleteMapping("/{content_id}")
    public ResponseEntity deleteContent(@PathVariable("content_id") long contentId) {
        contentService.deleteContent(contentId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
