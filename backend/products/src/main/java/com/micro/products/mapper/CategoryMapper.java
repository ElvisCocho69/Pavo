package com.micro.products.mapper;

import com.micro.products.dto.CategoryDto;
import com.micro.products.entity.Category;

public class CategoryMapper {

    public static Category mapToCategory(CategoryDto categoryDto, Category category) {
        category.setCategoryId(categoryDto.getCategoryId());
        category.setName(categoryDto.getName());
        category.setDescription(categoryDto.getDescription());
        return category;
    }

    public static CategoryDto mapToCategoryDto(Category category, CategoryDto categoryDto) {
        categoryDto.setCategoryId(category.getCategoryId());
        categoryDto.setName(category.getName());
        categoryDto.setDescription(category.getDescription());
        return categoryDto;
    }
}
