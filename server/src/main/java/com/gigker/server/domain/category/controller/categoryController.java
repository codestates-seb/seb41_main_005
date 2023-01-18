package com.gigker.server.domain.category.controller;

import com.gigker.server.domain.category.entity.Category;
import com.gigker.server.domain.category.repository.CategoryRepository;
import com.gigker.server.domain.tag.entity.Tag;
import com.gigker.server.domain.tag.repository.TagRepository;
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
@RequestMapping("/categories")
public class categoryController {

    private final CategoryRepository categoryRepository;

    @PostMapping
    public ResponseEntity tagPostDtoToTag(@Valid @RequestBody Category category) {
        categoryRepository.save(category);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}