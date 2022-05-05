package com.nearme.repositories;

import java.util.List;
import java.util.Optional;
import com.nearme.models.entities.ImageEntity;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<ImageEntity, Integer> {

    Optional<ImageEntity> findByidImages(Integer id);
    Optional<List<ImageEntity>> findByidReference(Integer id_reference);

}
