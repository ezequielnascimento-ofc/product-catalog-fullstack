package com.github.ki3lmigu3l.product.dto;

import com.github.ki3lmigu3l.product.model.Status;

import java.math.BigDecimal;

public record ProductRegisterDTO(
        String name,
        BigDecimal costPrice,
        BigDecimal salesPrice,
        Integer stockMin,
        Integer stockMax,
        Integer currentStock,
        Status productStatus,
        String category) {
}
