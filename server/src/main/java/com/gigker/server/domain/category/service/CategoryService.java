package com.gigker.server.domain.category.service;

import com.gigker.server.domain.category.entity.Category;
import com.gigker.server.domain.category.repository.CategoryRepository;
import com.gigker.server.domain.content.entity.Content;
import com.gigker.server.global.exception.BusinessLogicException;
import com.gigker.server.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional
@RequiredArgsConstructor
@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;
    public Category findExistCategory(String categoryName) {
        Optional<Category> optionalCategory = categoryRepository.findByCategoryName(categoryName);
        Category findCategory =
                optionalCategory.orElseThrow(()->
                        new BusinessLogicException(ExceptionCode.NOT_FOUND_CATEGORY));
        return findCategory;
    }
}
