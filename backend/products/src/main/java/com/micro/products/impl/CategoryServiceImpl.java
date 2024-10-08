package com.micro.products.impl;

import com.micro.products.dto.CategoryDto;
import com.micro.products.entity.Category;
import com.micro.products.exception.EntityAlreadyExistsException;
import com.micro.products.exception.ResourceNotFoundException;
import com.micro.products.mapper.CategoryMapper;
import com.micro.products.repository.CategoryRepository;
import com.micro.products.services.ICategoryService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CategoryServiceImpl implements ICategoryService {

    private CategoryRepository categoryRepository;

    @Override
    public List<CategoryDto> getAllCategories() {
        return categoryRepository
                .findAll()
                .stream()
                .map(category -> CategoryMapper.mapToCategoryDto(category, new CategoryDto()))
                .collect(Collectors.toList());
    }

    @Override
    public CategoryDto getCategoryById(Long categoryId) {
        Category category = categoryRepository.findByCategoryId(categoryId).orElseThrow(
                () -> new ResourceNotFoundException("Category", "categoryId", categoryId)
        );
        return CategoryMapper.mapToCategoryDto(category, new CategoryDto());
    }

    /**
     * @param categoryDto - CategoryDto Object
     */
    @Override
    public void createCategory(CategoryDto categoryDto) {
        Category category = CategoryMapper.mapToCategory(categoryDto, new Category()); // create Category
        categoryRepository.findByName(category.getName())
                .ifPresent(c -> {throw new EntityAlreadyExistsException("Category already exists, name: " + categoryDto.getName());});
        categoryRepository.save(category);
    }

    /**
     * @param categoryDto - CategoryDto Object
     * @return boolean indicating success or failure
     */
    @Override
    public boolean updateCategory(Long categoryId, CategoryDto categoryDto) {
        Category category = categoryRepository
                .findByCategoryId(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "categoryId", categoryId)
        );
        boolean hasChanges = !category.equals(CategoryMapper.mapToCategory(categoryDto, new Category()));
        if (hasChanges) {
            CategoryMapper.mapToCategory(categoryDto, category);
            categoryRepository.save(category);
            return true;
        }
        return false;
    }

    /**
     * @param categoryId - Input CategoryId
     * @return boolean indicating if the delete of Category is successful or not
     */
    @Override
    public boolean deleteCategory(Long categoryId) {
        Category category = categoryRepository
                .findByCategoryId(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "categoryId", categoryId)
        );
        categoryRepository.deleteById(category.getCategoryId());
        return true;
    }

}
