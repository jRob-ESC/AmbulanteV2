package com.udg.ambulantes.backend.controller;

import com.udg.ambulantes.backend.dto.HomeProductResponse;
import com.udg.ambulantes.backend.service.ProductService;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {
    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/random")
    public List<HomeProductResponse> getRandomProducts(
            @RequestParam(defaultValue = "4") int limit,
            @RequestParam(required = false) Long categoryId
    ) {
        int safeLimit = Math.max(1, Math.min(limit, 50));
        return productService.getRandomProducts(categoryId, PageRequest.of(0, safeLimit));
    }
}
