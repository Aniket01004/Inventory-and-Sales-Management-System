package com.example.inventory_sales_management.repository;

import com.example.inventory_sales_management.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product,Long> {
    @Query("SELECT p FROM Product p WHERE p.quantity < :threshold")
    List<Product> findByQuantityLessThan(@Param("threshold") Integer threshold);
    List<Product> findByQuantityGreaterThan(Integer quantity);
}
