package com.github.ki3lmigu3l.product.dto;

import com.github.ki3lmigu3l.product.model.Product;
import com.github.ki3lmigu3l.product.model.Status;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record ProductResponseDTO(Long id,
                                 String name,
                                 BigDecimal costPrice,
                                 BigDecimal salesPrice,
                                 Integer stockMin,
                                 Integer stockMax,
                                 Integer currentStock,
                                 Status productStatus,
                                 String category,
                                 LocalDateTime createdAt,
                                 LocalDateTime updatedAt) {

    public ProductResponseDTO(Product product) {
        this(
                product.getId(),
                product.getName(),
                product.getCostPrice(),
                product.getSalesPrice(),
                product.getStockMin(),
                product.getStockMax(),
                product.getCurrentStock(),
                product.getProductStatus(), 
                product.getProductCategory().getName(),
                product.getCreatedAt(),
                product.getUpdatedAt());
    }
}
