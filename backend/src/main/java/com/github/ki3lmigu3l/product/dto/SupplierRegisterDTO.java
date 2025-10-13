package com.github.ki3lmigu3l.product.dto;

import java.time.LocalDateTime;

public record SupplierRegisterDTO(String name,
                                  String contactEmail,
                                  String phone,
                                  LocalDateTime createdAt) {
}
