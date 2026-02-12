package com.example.inventory_sales_management.repository;

import com.example.inventory_sales_management.model.Sale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SaleRepository extends JpaRepository<Sale,Long> {
@Query("""
        SELECT SUM(s.totalPrice) FROM Sale s WHERE DATE(s.saleDate) = CURRENT_DATE
        """)
    Double getTodaySalesTotal();

@Query("""
        SELECT SUM(s.totalPrice) FROM Sale s WHERE MONTH(s.saleDate) = MONTH(CURRENT_DATE)
        AND YEAR(s.saleDate) = YEAR(CURRENT_DATE)
        """)
    Double getMonthlySalesTotal();
}
