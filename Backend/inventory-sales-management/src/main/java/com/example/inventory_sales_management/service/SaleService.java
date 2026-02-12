package com.example.inventory_sales_management.service;

public interface SaleService {
    void processSale(Long productId,Integer quantity);
    Double getTodaySalesTotal();
    Double getMonthlySalesTotal();
}
