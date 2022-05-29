package com.nearme.services;

import java.util.List;

import com.nearme.mappers.SupplierMapper;
import com.nearme.models.dto.SupplierDTO;
import com.nearme.models.entities.SupplierEntity;
import com.nearme.repositories.SupplierRepository;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class SupplierService {

    @Autowired
    SupplierRepository supplierRepository;

    /**
     * Gets supplier list
     * 
     * @return
     * @throws Exception
     */
    @Transactional
    public List<SupplierDTO> getSuppliers() throws Exception {
        List<SupplierEntity> suppliersList = supplierRepository.findAll();
        if (suppliersList.isEmpty()) {
            log.info("No suppliers found in the database");
            new Exception("No suppliers found");
        }
        return SupplierMapper.INSTANCE.mapEntityToDtoList(suppliersList);
    }

    /**
     * Gets supplier by id User
     * 
     * @return
     * @throws Exception
     */
    @Transactional
    public SupplierDTO getSupplierByIdUser(Integer idUser) throws Exception {
        SupplierEntity supplierEntity = supplierRepository.findByIdUser(idUser);
        if (supplierEntity == null) {
            log.info("No supplier found in the database");
            new Exception("No supplier found");
        }
        return SupplierMapper.INSTANCE.entityToDto(supplierEntity);
    }

    /**
     * Adds new supplier
     * 
     * @return
     * @throws Exception
     */
    @Transactional
    public SupplierDTO addSupplier(SupplierDTO supplierDTO) throws Exception {
        SupplierEntity supplierEntity = SupplierMapper.INSTANCE.dtoToEntity(supplierDTO);
        SupplierEntity supplier = supplierRepository.save(supplierEntity);
        if (supplier == null) {
            log.info("No supplier added");
            new Exception("No supplier added");
        }
        return SupplierMapper.INSTANCE.entityToDto(supplier);
    }

    /**
     * Gets supplier by id Supplier
     * 
     * @return
     * @throws Exception
     */
    @Transactional
    public SupplierDTO getSupplierByIdSupplier(Integer idSupplier) throws Exception {
        SupplierEntity supplierEntity = supplierRepository.findByIdSupplier(idSupplier);
        if (supplierEntity == null) {
            log.info("No supplier found in the database");
            new Exception("No supplier found");
        }
        return SupplierMapper.INSTANCE.entityToDto(supplierEntity);
    }
}
