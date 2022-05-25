package com.nearme.mappers;

import java.util.ArrayList;
import java.util.List;

import com.nearme.models.dto.CategoryDTO;
import com.nearme.models.entities.CategoryEntity;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface CategoryMapper {
    CategoryMapper INSTANCE = Mappers.getMapper(CategoryMapper.class);

    CategoryDTO entityToDto(CategoryEntity entity);

    CategoryEntity dtoToEntity(CategoryDTO dto);

    ArrayList<CategoryDTO> mapEntityToDtoList(List<CategoryEntity> categoryEntityList);

}
