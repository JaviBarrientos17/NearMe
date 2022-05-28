package com.nearme.repositories;

import java.util.List;
import java.util.Optional;

import com.nearme.models.entities.CategoryEntity;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<CategoryEntity, Integer> {

    Optional<List<CategoryEntity>> findByIdCategory(Integer Id_Category);

    Optional<List<CategoryEntity>> findByRoot(boolean root);

    Optional<List<CategoryEntity>> findByNameContaining(String categoryName);

    @Query("select c from nm_category c where c.name like ?#{[0]}")
    Optional<List<CategoryEntity>>   findCategoyByName(String name);
}
