package com.nearme.mappers;

import java.util.ArrayList;
import java.util.List;

import com.nearme.models.dto.UserDTO;
import com.nearme.models.entities.UserEntity;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface UserMapper {
	UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

	@Mapping(target = "password", ignore = true)
	UserDTO entityToDto(UserEntity entity);

	UserEntity dtoToEntity(UserDTO dto);
 	
	ArrayList<UserDTO> mapEntityToDtoList(List<UserEntity> userEntityList);
}
