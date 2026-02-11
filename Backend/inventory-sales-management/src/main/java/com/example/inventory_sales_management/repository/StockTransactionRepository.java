package com.example.inventory_sales_management.repository;

import com.example.inventory_sales_management.model.StockTransaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StockTransactionRepository extends JpaRepository<StockTransaction, Long> {

}
