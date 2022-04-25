package com.nearme.repositories;
import  com.nearme.models.entities.UserEntity;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserEntity, Integer> {
	Optional<UserEntity> findByUsername(String username);
	Optional<List<UserEntity>> findByRoles_(String role);
}