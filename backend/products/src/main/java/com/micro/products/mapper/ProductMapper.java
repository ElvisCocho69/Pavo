package com.micro.products.mapper;

import com.micro.products.dto.ProductDto;
import com.micro.products.entity.Product;

public class ProductMapper {

    public static Product mapToProduct(ProductDto productDto, Product product) {
        product.setName(productDto.getName());
        product.setDescription(productDto.getDescription());
        product.setPrice(productDto.getPrice());
        product.setStock(productDto.getStock());
        product.setCategoryId(productDto.getCategoryId());
        product.setSupplierId(productDto.getSupplierId());
        return product;
    }

    public static ProductDto mapToProductDto(Product product, ProductDto productDto) {
        productDto.setName(product.getName());
        productDto.setDescription(product.getDescription());
        productDto.setPrice(product.getPrice());
        productDto.setStock(product.getStock());
        productDto.setCategoryId(product.getCategoryId());
        productDto.setSupplierId(product.getSupplierId());
        return productDto;
    }
}