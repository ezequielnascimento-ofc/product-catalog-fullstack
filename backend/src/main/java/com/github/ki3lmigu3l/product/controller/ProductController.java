package com.github.ki3lmigu3l.product.controller;

import com.github.ki3lmigu3l.product.dto.ProductRegisterDTO;
import com.github.ki3lmigu3l.product.dto.ProductResponseDTO;
import com.github.ki3lmigu3l.product.dto.ProductUpdateDTO;
import com.github.ki3lmigu3l.product.model.Category;
import com.github.ki3lmigu3l.product.model.Product;
import com.github.ki3lmigu3l.product.service.CategoryService;
import com.github.ki3lmigu3l.product.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.JoinColumn;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private CategoryService categoryService;

    @Operation(summary = "Register a new Product", description = "This endpoint, which is also a POST, is used to register a new product in our system.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Indicates that the product has been successfully registered." ),
            @ApiResponse(responseCode = "500", description = "Indicates an internal server error.")
    })
    @PostMapping
    public ResponseEntity<ProductResponseDTO> registerProduct (@RequestBody ProductRegisterDTO productDto) {

       Product product = new Product();
       BeanUtils.copyProperties(productDto, product);
       String categoryName = productDto.category();

       Optional<Category> category = categoryService.findCategoryByName(categoryName);

       if (category.isEmpty()) {

           if (categoryName.isEmpty()) {
               categoryName = "Default";
           }

           Category newCategory = new Category(categoryName);
           product.setProductCategory(newCategory);

           categoryService.save(newCategory);
           productService.saveProduct(product);
       } else {
           product.setProductCategory(category.get());
           productService.saveProduct(product);
       }


       return ResponseEntity
               .status(HttpStatus.CREATED)
               .body(new ProductResponseDTO(product));
    }

    @Operation(summary = "List all products.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Indicates that all products from the database were successfully listed."),
            @ApiResponse(responseCode = "500", description = "Indicates an internal server error.")
    })
    @GetMapping
    public ResponseEntity<List<ProductResponseDTO>> listProducts () {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(productService.listProducts());
    }

    @Operation(summary = "Searches for a specific product by ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Indicates that the requested product was found."),
            @ApiResponse(responseCode = "404", description = "Indicates that the product with this ID was not found."),
            @ApiResponse(responseCode = "500", description = "Indicates an internal server error.")
    })
    @GetMapping("/{id}")
    public ResponseEntity<ProductResponseDTO> listProductById (@PathVariable Long id) {
        Product productFound = productService.listProductByIid(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ProductResponseDTO(productFound));
    }

    @Operation(summary = "Removes a product from the database/system by ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Indicates that the product was successfully removed."),
            @ApiResponse(responseCode = "404", description = "Indicates that the product with this ID was not found."),
            @ApiResponse(responseCode = "500", description = "Indicates an internal server error.")
    })
    @DeleteMapping("/{id}")
    @JoinColumn(name = "category_id", foreignKey = @ForeignKey(name = "fk_product_category", foreignKeyDefinition = "FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE SET NULL"))
    public ResponseEntity<?> removeProduct (@PathVariable Long id) {

        Product productFound = productService.listProductByIid(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        productService.removeProduct(id);

        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .build();
    }

    @Operation(summary = "Endpoint responsible for updating the fields of our Product entity.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Indicates that the product was successfully updated."),
            @ApiResponse(responseCode = "404", description = "Indicates that the product with this ID was not found."),
            @ApiResponse(responseCode = "500", description = "Indicates an internal server error.")
    })
    @PutMapping("/{id}")
    public ResponseEntity<ProductResponseDTO> updateProduct (@PathVariable Long id,
                                                             @RequestBody ProductUpdateDTO productDto) {

        Product productFound = productService.listProductByIid(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        BeanUtils.copyProperties(productDto, productFound);
        productService.updateProduct(productFound);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ProductResponseDTO(productFound));
    }
}
