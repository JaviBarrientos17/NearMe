package com.nearme.repositories;

import com.nearme.models.entities.ProductEntity;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<ProductEntity, Integer> {

    Optional<List<ProductEntity>> findByStock(Integer stock);

    Optional<List<ProductEntity>> findByCategory(Integer id_category);

    Optional<List<ProductEntity>> findBySubCategory(Integer id_subCategory);

    Optional<List<ProductEntity>> findByName(String productName);

    
    ProductEntity findByReference(String reference);

    Optional<List<ProductEntity>> findByIdSupplier(Integer id_supplier);

}
