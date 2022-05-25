package com.nearme.repositories;

import java.util.List;
import java.util.Optional;

import com.nearme.models.entities.CategoryEntity;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<CategoryEntity, Integer> {

    Optional<List<CategoryEntity>> findByIdCategory(Integer Id_Category);

    Optional<List<CategoryEntity>> findByRoot(boolean root);

}
