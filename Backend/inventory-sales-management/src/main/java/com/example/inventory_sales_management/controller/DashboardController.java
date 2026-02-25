package com.example.inventory_sales_management.controller;

import com.example.inventory_sales_management.service.ProductService;
import com.example.inventory_sales_management.service.SaleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {
    private final ProductService productService;
    private final SaleService saleService;
    public DashboardController(ProductService productService,
                               SaleService saleService){
        this.productService = productService;
        this.saleService = saleService;
    }

    @GetMapping("/summary")
    public ResponseEntity<?> getSummary(){
        Map<String,Object> summary = new HashMap<>();

        summary.put("lowStockCount",
                productService.getLowStockProducts(5).size());

        summary.put("todaySales",saleService.getTodaySalesTotal());
        summary.put("monthlySales",saleService.getMonthlySalesTotal());
        return ResponseEntity.ok(summary);
    }
}
