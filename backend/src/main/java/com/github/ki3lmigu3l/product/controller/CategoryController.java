package com.github.ki3lmigu3l.product.controller;

import com.github.ki3lmigu3l.product.dto.CategoryRegisterDTO;
import com.github.ki3lmigu3l.product.dto.CategoryResponseDTO;
import com.github.ki3lmigu3l.product.dto.CategoryUpdateDTO;
import com.github.ki3lmigu3l.product.model.Category;
import com.github.ki3lmigu3l.product.service.CategoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "http://localhost:5173/")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @Operation(summary = "Creates a new category in the system.")
    @ApiResponses( value = {
            @ApiResponse(responseCode = "201", description = "Indicates that the category was created successfully."),
            @ApiResponse(responseCode = "500", description = "Indicates an internal server error.")
    })
    @PostMapping
    public ResponseEntity<CategoryResponseDTO> registerCategory (@RequestBody CategoryRegisterDTO categoryDto) {

        Category category = new Category();
        String categoryName = categoryDto.name();

        if (categoryName.isEmpty()) {
            category.setName("Default");
            categoryService.save(category);
        } else {
            BeanUtils.copyProperties(categoryDto, category);
            categoryService.save(category);
        }

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new CategoryResponseDTO(category));
    }

    @Operation(summary = "GET endpoint that returns all available categories.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Indicates that all categories have been found."),
            @ApiResponse(responseCode = "500", description = "Indicates an internal server error.")
    })
    @GetMapping
    public ResponseEntity<List<CategoryResponseDTO>> listCategories () {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(categoryService.listCategories());
    }

    @Operation(summary = "Finds a category by its ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Indicates that the category was successfully found."),
            @ApiResponse(responseCode = "404", description = "Indicates that the category with this ID was not found."),
            @ApiResponse(responseCode = "500", description = "Indicates an internal server error.")
    })
    @GetMapping("/{id}")
    public ResponseEntity<CategoryResponseDTO> listCategoryById (@PathVariable Long id) {
        Category categoryFound = categoryService.findCategoryById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new CategoryResponseDTO(categoryFound));
    }

    @Operation(summary = "DELETE endpoint to remove or delete a category from the database.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Indicates that the category was successfully deleted."),
            @ApiResponse(responseCode = "404", description = "Indicates that the category with this ID was not found."),
            @ApiResponse(responseCode = "500", description = "Indicates an internal server error.")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<?> removeCategory (@PathVariable Long id) {
        Category categoryFound = categoryService.findCategoryById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        categoryService.removeCategory(id);

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
    public ResponseEntity<CategoryResponseDTO> updateCategory (@PathVariable Long id,
                                                               @RequestBody CategoryUpdateDTO categoryDto) {

        Category categoryFound = categoryService.findCategoryById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        BeanUtils.copyProperties(categoryDto, categoryFound);

        categoryService.save(categoryFound);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new CategoryResponseDTO(categoryFound));
    }
}
