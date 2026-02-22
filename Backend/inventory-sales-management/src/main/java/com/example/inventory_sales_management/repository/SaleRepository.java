package com.example.inventory_sales_management.repository;

import com.example.inventory_sales_management.model.Sale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;

public interface SaleRepository extends JpaRepository<Sale, Long> {

    // Reusable method for any date range (daily, monthly, custom)
    @Query("""
        SELECT COALESCE(SUM(s.totalPrice), 0)
        FROM Sale s
        WHERE s.saleDate >= :start
        AND s.saleDate < :end
    """)
    Double getSalesBetween(
            @Param("start") LocalDateTime start,
            @Param("end") LocalDateTime end
    );
}