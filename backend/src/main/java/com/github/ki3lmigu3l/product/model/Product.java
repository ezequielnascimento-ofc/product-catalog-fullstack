package com.github.ki3lmigu3l.product.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private BigDecimal costPrice;
    private BigDecimal salesPrice;
    private Integer stockMin;
    private Integer stockMax;
    private Integer currentStock;
    @Enumerated(EnumType.STRING)
    private Status productStatus;
    @ManyToOne
    private Category productCategory;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
