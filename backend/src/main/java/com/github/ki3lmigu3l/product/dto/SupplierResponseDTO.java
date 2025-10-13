package com.github.ki3lmigu3l.product.dto;

import com.github.ki3lmigu3l.product.model.Supplier;

import java.time.LocalDateTime;

public record SupplierResponseDTO(String name,
                                  String contactEmail,
                                  String phone,
                                  LocalDateTime createdAt) {

    public SupplierResponseDTO(Supplier supplier) {
        this(supplier.getName(), supplier.getContactEmail(), supplier.getPhone(), supplier.getCreatedAt());
    }
}
