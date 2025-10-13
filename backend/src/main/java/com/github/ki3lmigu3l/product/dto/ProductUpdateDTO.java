package com.github.ki3lmigu3l.product.dto;

import com.github.ki3lmigu3l.product.model.Status;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record ProductUpdateDTO(String name,
                               BigDecimal costPrice,
                               BigDecimal salesPrice,
                               Integer stockMin,
                               Integer stockMax,
                               Integer currentStock,
                               Status productStatus,
                               String category,
                               LocalDateTime createdAt,
                               LocalDateTime updatedAt) {
}
