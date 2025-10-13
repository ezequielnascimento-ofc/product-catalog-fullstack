package com.github.ki3lmigu3l.product.repository;

import com.github.ki3lmigu3l.product.model.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SupplierRepository extends JpaRepository<Supplier, Long> {
}
