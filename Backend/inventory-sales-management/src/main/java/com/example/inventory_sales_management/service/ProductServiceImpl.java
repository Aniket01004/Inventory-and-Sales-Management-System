package com.example.inventory_sales_management.service;
import com.example.inventory_sales_management.model.Product;
import com.example.inventory_sales_management.model.StockTransaction;
import com.example.inventory_sales_management.model.TransactionType;
import com.example.inventory_sales_management.repository.ProductRepository;
import com.example.inventory_sales_management.repository.StockTransactionRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {
    private final StockTransactionRepository stockTransactionRepository;
    private final ProductRepository productRepository;
    public ProductServiceImpl(ProductRepository productRepository, StockTransactionRepository stockTransactionRepository){
        this.productRepository = productRepository;
        this.stockTransactionRepository = stockTransactionRepository;
    }

    public Product createProduct(Product product){
        return productRepository.save(product);
    }

    public List<Product> getAllProducts(){
        return productRepository.findAll();
    }

    public Product getProductById(Long id){
        return productRepository.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));
    }

    public Product updateProduct(Long id,Product updatedProduct){
        Product existing = getProductById(id);
        existing.setName(updatedProduct.getName());
        existing.setPrice(updatedProduct.getPrice());
        return productRepository.save(existing);
    }

    public void deleteProduct(Long id){
        productRepository.deleteById(id);
    }

    @Transactional
    public void updateStock(Long productId, Integer quantity, TransactionType type){
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        if(type == TransactionType.IN){
            product.setQuantity(product.getQuantity() + quantity);
        }else{
            if(product.getQuantity() < quantity){
                throw new RuntimeException("Insufficient Stock");
            }
            product.setQuantity(product.getQuantity() - quantity);
        }
        productRepository.save(product);

        StockTransaction transaction = new StockTransaction();
        transaction.setProduct(product);
        transaction.setType(type);
        transaction.setQuantity(quantity);
        transaction.setTimestamp(LocalDateTime.now());
        stockTransactionRepository.save(transaction);
    }

}
