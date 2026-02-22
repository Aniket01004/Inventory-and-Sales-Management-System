package com.example.inventory_sales_management.service;

import com.example.inventory_sales_management.model.Product;
import com.example.inventory_sales_management.model.Sale;
import com.example.inventory_sales_management.repository.ProductRepository;
import com.example.inventory_sales_management.repository.SaleRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class SaleServiceImpl implements SaleService {

    private final SaleRepository saleRepository;
    private final ProductRepository productRepository;

    public SaleServiceImpl(SaleRepository saleRepository,
                           ProductRepository productRepository) {
        this.saleRepository = saleRepository;
        this.productRepository = productRepository;
    }

    @Transactional
    @Override
    public void processSale(Long productId, Integer quantity) {

        if (quantity == null || quantity <= 0) {
            throw new RuntimeException("Quantity must be greater than 0");
        }

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if (product.getQuantity() < quantity) {
            throw new RuntimeException("Insufficient stock");
        }

        // Reduce stock
        product.setQuantity(product.getQuantity() - quantity);
        productRepository.save(product);

        // Create sale record
        Sale sale = new Sale();
        sale.setProduct(product);
        sale.setQuantity(quantity);
        sale.setTotalPrice(product.getPrice() * quantity);
        sale.setSaleDate(LocalDateTime.now());

        saleRepository.save(sale);
    }

    @Override
    public Double getTodaySalesTotal() {

        LocalDate today = LocalDate.now();

        LocalDateTime start = today.atStartOfDay();
        LocalDateTime end = today.plusDays(1).atStartOfDay();

        return saleRepository.getSalesBetween(start, end);
    }

    @Override
    public Double getMonthlySalesTotal() {

        LocalDate today = LocalDate.now();

        LocalDateTime start = today.withDayOfMonth(1).atStartOfDay();
        LocalDateTime end = start.plusMonths(1);

        return saleRepository.getSalesBetween(start, end);
    }

    @Override
    public List<Sale> getAllSales() {
        return saleRepository.findAll();
    }
}