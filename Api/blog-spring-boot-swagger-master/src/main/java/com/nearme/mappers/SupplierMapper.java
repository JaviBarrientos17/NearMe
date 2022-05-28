package com.nearme.mappers;

import java.util.ArrayList;
import java.util.List;

import com.nearme.models.dto.SupplierDTO;
import com.nearme.models.entities.SupplierEntity;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface SupplierMapper {

    SupplierMapper INSTANCE = Mappers.getMapper(SupplierMapper.class);

    SupplierDTO entityToDto(SupplierEntity entity);

    SupplierEntity dtoToEntity(SupplierDTO dto);

    ArrayList<SupplierDTO> mapEntityToDtoList(List<SupplierEntity> supplierEntityList);
}
