package com.example.inventory_sales_management.service;

import com.example.inventory_sales_management.model.Sale;

import java.util.List;

public interface SaleService {
    void processSale(Long productId,Integer quantity);
    Double getTodaySalesTotal();
    Double getMonthlySalesTotal();
    List<Sale> getAllSales();
}
