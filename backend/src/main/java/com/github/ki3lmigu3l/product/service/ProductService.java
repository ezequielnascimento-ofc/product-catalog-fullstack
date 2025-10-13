package com.github.ki3lmigu3l.product.service;

import com.github.ki3lmigu3l.product.dto.ProductResponseDTO;
import com.github.ki3lmigu3l.product.model.Product;
import com.github.ki3lmigu3l.product.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<ProductResponseDTO> listProducts() {
        var products = productRepository.findAll();

        return products.stream()
                .map(ProductResponseDTO::new)
                .toList();
    }

    public void saveProduct(Product product) {
        product.setCreatedAt(LocalDateTime.now());
        productRepository.save(product);
    }

    public Optional<Product> listProductByIid(Long id) {
        return productRepository.findById(id);
    }

    public void removeProduct(Long id) {
        productRepository.deleteById(id);
    }

    public void updateProduct(Product productFound) {
        productFound.setUpdatedAt(LocalDateTime.now());
        productRepository.save(productFound);
    }
}
