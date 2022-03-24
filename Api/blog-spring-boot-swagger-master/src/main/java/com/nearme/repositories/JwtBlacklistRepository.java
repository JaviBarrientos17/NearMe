package com.nearme.repositories;

import java.util.Optional;

import com.nearme.models.entities.JwtBlacklistEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JwtBlacklistRepository extends JpaRepository<JwtBlacklistEntity, Integer> {
	Optional<JwtBlacklistEntity> findByToken(String token);
}
