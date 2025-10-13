package com.github.ki3lmigu3l.product.service;

import com.github.ki3lmigu3l.product.dto.CategoryResponseDTO;
import com.github.ki3lmigu3l.product.model.Category;
import com.github.ki3lmigu3l.product.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public void save(Category category) {
        categoryRepository.save(category);
    }

    public List<CategoryResponseDTO> listCategories() {
        var categories = categoryRepository.findAll();

        return categories
                .stream()
                .map(CategoryResponseDTO::new)
                .toList();
    }

    public Optional<Category> findCategoryById(Long id) {
        return categoryRepository.findById(id);
    }

    public void removeCategory(Long id) {
        categoryRepository.deleteById(id);
    }

    public Optional<Category> findCategoryByName(String name) {
        return categoryRepository.findCategoryByName(name);
    }
}
