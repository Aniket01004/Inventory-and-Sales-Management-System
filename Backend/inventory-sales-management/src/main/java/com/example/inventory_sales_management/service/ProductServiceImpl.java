package com.example.inventory_sales_management.service;
import com.example.inventory_sales_management.model.Product;
import com.example.inventory_sales_management.model.Sale;
import com.example.inventory_sales_management.model.StockTransaction;
import com.example.inventory_sales_management.model.TransactionType;
import com.example.inventory_sales_management.repository.ProductRepository;
import com.example.inventory_sales_management.repository.SaleRepository;
import com.example.inventory_sales_management.repository.StockTransactionRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {
    private final StockTransactionRepository stockTransactionRepository;
    private final ProductRepository productRepository;
    private final SaleRepository saleRepository;
    public ProductServiceImpl(ProductRepository productRepository,
                              StockTransactionRepository stockTransactionRepository,
                              SaleRepository saleRepository){
        this.productRepository = productRepository;
        this.stockTransactionRepository = stockTransactionRepository;
        this.saleRepository = saleRepository;
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

    @Transactional
    public void processSale(Long productId,Integer quantity){
        Product product = productRepository.findById(productId)
                .orElseThrow(()->new RuntimeException("Product not found"));
        if (quantity == null || quantity <= 0) {
            throw new RuntimeException("Quantity must be greater than 0");
        }

        product.setQuantity(product.getQuantity() - quantity);
        productRepository.save(product);

        Sale sale = new Sale();
        sale.setProduct(product);
        sale.setQuantity(quantity);
        sale.setTotalPrice(product.getPrice() * quantity);
        sale.setSaleDate(LocalDateTime.now());
        saleRepository.save(sale);
    }
}
