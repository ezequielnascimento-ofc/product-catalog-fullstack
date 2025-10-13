package com.github.ki3lmigu3l.product.dto;

import com.github.ki3lmigu3l.product.model.Category;

public record CategoryResponseDTO(Long id, String name) {
    public CategoryResponseDTO (Category category) {
        this(category.getId(), category.getName());
    }
}
