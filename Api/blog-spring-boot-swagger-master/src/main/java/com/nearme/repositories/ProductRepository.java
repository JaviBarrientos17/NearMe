package com.nearme.repositories;

import com.nearme.models.entities.ProductEntity;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<ProductEntity, Integer>{
    Optional<ProductEntity> findByIdProduct(Integer IdProduct);
}
