package com.example.inventory_sales_management.service;

import com.example.inventory_sales_management.model.User;

public interface AuthService {

    User authenticate(String username, String password);

}
