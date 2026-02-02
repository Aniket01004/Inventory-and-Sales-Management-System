package com.example.inventory_sales_management.repository;

import com.example.inventory_sales_management.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product,Long> {

}
