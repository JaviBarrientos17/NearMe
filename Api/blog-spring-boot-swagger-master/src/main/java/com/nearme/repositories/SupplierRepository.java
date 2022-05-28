package com.nearme.repositories;

import com.nearme.models.entities.SupplierEntity;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SupplierRepository extends JpaRepository<SupplierEntity, Integer> {

    Optional<List<SupplierEntity>> findByName(String supplierName);

    SupplierEntity findByIdUser(Integer idUser);
}
