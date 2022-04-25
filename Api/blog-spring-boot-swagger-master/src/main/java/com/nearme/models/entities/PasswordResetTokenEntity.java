package com.nearme.models.entities;

import java.util.Calendar;
import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "password_reset_token")
public class PasswordResetTokenEntity {
	//2 days
	private static final int EXPIRATION = 60 * 24 * 2; 
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	private String token;
	@Builder.Default
	private Boolean used = false;

	@OneToOne(targetEntity = UserEntity.class, fetch = FetchType.LAZY)
	private UserEntity userEntity;

	private Date expiryDate;

	public PasswordResetTokenEntity(String token, UserEntity userEntity, Boolean used) {
		this.token = token;
		this.userEntity = userEntity;
		this.expiryDate = calculateExpiryDate(EXPIRATION);
		this.used = used;
	}

	private java.sql.Timestamp calculateExpiryDate(int expiryTimeMinutes) {
		Calendar cal = Calendar.getInstance();
		cal.add(Calendar.MINUTE, expiryTimeMinutes);
		return new java.sql.Timestamp(cal.getTime().getTime());
	}
}