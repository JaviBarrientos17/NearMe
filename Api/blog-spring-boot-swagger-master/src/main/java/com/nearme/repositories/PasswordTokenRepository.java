package com.nearme.repositories;

import java.util.ArrayList;
import org.springframework.data.jpa.repository.JpaRepository;
import com.nearme.models.entities.PasswordResetTokenEntity;
import com.nearme.models.entities.UserEntity;

public interface PasswordTokenRepository extends JpaRepository<PasswordResetTokenEntity, Long> {
	PasswordResetTokenEntity findByToken(String token);
	ArrayList<PasswordResetTokenEntity> findAllByUserEntity(UserEntity userEntity);
}
