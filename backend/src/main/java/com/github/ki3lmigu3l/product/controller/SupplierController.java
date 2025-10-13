package com.github.ki3lmigu3l.product.controller;

import com.github.ki3lmigu3l.product.dto.SupplierRegisterDTO;
import com.github.ki3lmigu3l.product.dto.SupplierResponseDTO;
import com.github.ki3lmigu3l.product.model.Supplier;
import com.github.ki3lmigu3l.product.service.SupplierService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/suppliers")
@CrossOrigin(origins = "http://localhost:5173")
public class SupplierController {

    @Autowired
    private SupplierService supplierService;

    @PostMapping
    public ResponseEntity<SupplierResponseDTO> registerSupplier (@RequestBody SupplierRegisterDTO supplierDto) {
        var supplier = new Supplier();
        BeanUtils.copyProperties(supplierDto, supplier);

        supplierService.saveSupplier(supplier);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new SupplierResponseDTO(supplier));
    }

    @GetMapping
    public ResponseEntity<List<SupplierResponseDTO>> listAllSupplier () {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(supplierService.listAllSupplier());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SupplierResponseDTO> listSupplierById(@PathVariable Long id) {

        var supplierFound = supplierService.findSupplierById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new SupplierResponseDTO(supplierFound));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SupplierResponseDTO> updateSupplier (@PathVariable Long id,
                                                               @RequestBody SupplierRegisterDTO supplierDto) {
        var supplierFound = supplierService.findSupplierById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        supplierService.updateSupplier(supplierFound);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new SupplierResponseDTO(supplierFound));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSupplier (@PathVariable Long id) {

        var supplierFound = supplierService.findSupplierById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        supplierService.removeSupplier(supplierFound);

        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .build();
    }
}
