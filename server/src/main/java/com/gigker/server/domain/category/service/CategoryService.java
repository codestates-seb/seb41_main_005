package com.gigker.server.domain.category.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gigker.server.domain.category.entity.Category;
import com.gigker.server.domain.category.repository.CategoryRepository;
import com.gigker.server.global.exception.BusinessLogicException;
import com.gigker.server.global.exception.ExceptionCode;

import lombok.RequiredArgsConstructor;

@Transactional
@RequiredArgsConstructor
@Service
public class CategoryService {
	private final CategoryRepository categoryRepository;

	public Category findExistCategory(String categoryName) {
		Optional<Category> optionalCategory = categoryRepository.findByCategoryName(categoryName);
		Category findCategory =
			optionalCategory.orElseThrow(() ->
				new BusinessLogicException(ExceptionCode.NOT_FOUND_CATEGORY));
		return findCategory;
	}

	public List<Category> findCategories() {
		return categoryRepository.findAll();
	}
}
