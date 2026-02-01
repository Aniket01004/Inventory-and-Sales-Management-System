package com.example.inventory_sales_management.controller;

import com.example.inventory_sales_management.model.Product;
import com.example.inventory_sales_management.service.ProductService;
import com.example.inventory_sales_management.service.ProductServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    private final ProductService productService;

    public ProductController(ProductService productService){
        this.productService = productService;
    }

    // Create
    @PostMapping
    public Product createProduct(@RequestBody Product product){
        return productService.createProduct(product);
    }

    // Read all
    @GetMapping
    public List<Product> getAllProducts(){
        return  productService.getAllProducts();
    }

    // Read by Id
    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id){
        return productService.getProductById(id);
    }

    // Update
    @PutMapping("/{id}")
    public Product updateProduct(@PathVariable Long id,@RequestBody Product product){
        return productService.updateProduct(id, product);
    }

    // Delete
    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id){
         productService.deleteProduct(id);
    }

}
