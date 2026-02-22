package com.example.inventory_sales_management.controller;

import com.example.inventory_sales_management.model.Product;
import com.example.inventory_sales_management.model.Sale;
import com.example.inventory_sales_management.model.TransactionType;
import com.example.inventory_sales_management.service.ProductService;
import com.example.inventory_sales_management.service.SaleService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;
import java.io.File;
import java.nio.file.StandardCopyOption;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/products")
public class ProductController {
    private final ProductService productService;
    private final SaleService saleService;

    public ProductController(ProductService productService,SaleService saleService)
    {
        this.productService = productService;
        this.saleService = saleService;
    }

    // Create
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/with-image")
    public ResponseEntity<?> createProductWithImage(
            @RequestParam String name,
            @RequestParam Double price,
            @RequestParam Integer quantity,
            @RequestParam MultipartFile image
    ) {
        try {

            // Absolute upload path
            String uploadDir = System.getProperty("user.dir") + "/uploads/";

            // Ensure directory exists
            File directory = new File(uploadDir);
            if (!directory.exists()) {
                directory.mkdirs();
            }

            // Generate unique filename
            String fileName = UUID.randomUUID() + "_" + image.getOriginalFilename();

            Path filePath = Paths.get(uploadDir + fileName);

            // Save file (replace if exists)
            Files.copy(image.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            // Create product
            Product product = new Product();
            product.setName(name);
            product.setPrice(price);
            product.setQuantity(quantity);
            product.setImageUrl(fileName);  // save filename in DB

            Product saved = productService.createProduct(product);

            return ResponseEntity.status(HttpStatus.CREATED).body(saved);

        } catch (Exception e) {
            e.printStackTrace(); // important for debugging
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Image upload failed");
        }
    }
    // Read all
    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts(){

        return ResponseEntity.ok(productService.getAllProducts());
    }

    // Read by Id
    @GetMapping("/{id}")
    public ResponseEntity<?> getProductById(@PathVariable Long id){
        try{
            Product product = productService.getProductById(id);
            return ResponseEntity.ok(product);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
            .body("Product not found with id " + id);
        }
    }

    // Update
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}/with-image")
    public ResponseEntity<?> updateProductWithImage(
            @PathVariable Long id,
            @RequestParam String name,
            @RequestParam Double price,
            @RequestParam Integer quantity,
            @RequestParam(required = false) MultipartFile image
    ) {
        try {

            Product product = productService.getProductById(id);

            product.setName(name);
            product.setPrice(price);
            product.setQuantity(quantity);

            if (image != null && !image.isEmpty()) {

                String uploadDir = System.getProperty("user.dir") + "/uploads/";

                File directory = new File(uploadDir);
                if (!directory.exists()) {
                    directory.mkdirs();
                }

                String fileName = UUID.randomUUID() + "_" + image.getOriginalFilename();
                Path filePath = Paths.get(uploadDir + fileName);

                Files.copy(image.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

                product.setImageUrl(fileName);
            }

            Product updated = productService.updateProduct(id, product);

            return ResponseEntity.ok(updated);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Product update failed");
        }
    }

    // Delete
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id){
        try{
            productService.deleteProduct(id);
            return ResponseEntity.noContent().build();

        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found with id " + id);
        }
    }
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/{id}/stock")
    public ResponseEntity<?> updateStock(
            @PathVariable Long id,
            @RequestParam Integer quantity,
            @RequestParam TransactionType type
            ){
        try {
            productService.updateStock(id, quantity, type);
            return ResponseEntity.ok("Stock updated successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        }

    }

    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    @PostMapping("/{id}/sale")
    public ResponseEntity<?> createSale(
            @PathVariable Long id,
            @RequestParam Integer quantity
    ){
        try{
            saleService.processSale(id, quantity);
            return ResponseEntity.ok("Sale processed successfully");
        }catch (RuntimeException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        }
    }

    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    @GetMapping("/low-stock")
   public ResponseEntity<List<Product>> getLowStockProducts(
           @RequestParam(defaultValue = "5")Integer threshold
    ){
        return ResponseEntity.ok(productService.getLowStockProducts(threshold));
    }



}
