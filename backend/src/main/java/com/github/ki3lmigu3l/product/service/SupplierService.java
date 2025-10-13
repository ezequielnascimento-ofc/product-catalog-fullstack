package com.github.ki3lmigu3l.product.service;

import com.github.ki3lmigu3l.product.dto.SupplierResponseDTO;
import com.github.ki3lmigu3l.product.model.Supplier;
import com.github.ki3lmigu3l.product.repository.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class SupplierService {

    @Autowired
    private SupplierRepository supplierRepository;

    public void saveSupplier(Supplier supplier) {
        supplier.setCreatedAt(LocalDateTime.now());
        supplierRepository.save(supplier);
    }

    public List<SupplierResponseDTO> listAllSupplier() {
        return supplierRepository.findAll()
                .stream()
                .map(SupplierResponseDTO::new)
                .toList();
    }

    public Optional<Supplier> findSupplierById(Long id) {
        return supplierRepository.findById(id);
    }

    public void updateSupplier(Supplier supplierFound) {
        supplierFound.setUpdatedAt(LocalDateTime.now());
        supplierRepository.save(supplierFound);
    }

    public void removeSupplier(Supplier supplierFound) {
        supplierRepository.delete(supplierFound);
    }
}
