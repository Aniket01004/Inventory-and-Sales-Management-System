package com.example.inventory_sales_management.service;
import com.example.inventory_sales_management.model.Product;
import com.example.inventory_sales_management.model.TransactionType;

import java.util.List;

public interface ProductService {
    Product createProduct(Product product);
    List<Product> getAllProducts();
    Product getProductById(Long id);
    Product updateProduct(Long id,Product product);
    void deleteProduct(Long id);

    void updateStock(Long id, Integer quantity, TransactionType type);

    void processSale(Long id, Integer quantity);
}
