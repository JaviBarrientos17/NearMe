package com.nearme.mappers;

import java.util.ArrayList;
import java.util.List;

import com.nearme.models.dto.ProductDTO;
import com.nearme.models.entities.ProductEntity;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ProductMapper {
    
    ProductMapper INSTANCE = Mappers.getMapper(ProductMapper.class);

 ProductDTO entityToDto(ProductEntity entity);
 ProductEntity dtoToEntity(ProductDTO dto);

 ArrayList<ProductDTO> mapEntityToDtoList(List<ProductEntity>productEntityList);
}
