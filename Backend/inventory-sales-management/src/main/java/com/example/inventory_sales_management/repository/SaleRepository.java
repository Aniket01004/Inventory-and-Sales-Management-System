package com.example.inventory_sales_management.repository;

import com.example.inventory_sales_management.model.Sale;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SaleRepository extends JpaRepository<Sale,Long> {

}
