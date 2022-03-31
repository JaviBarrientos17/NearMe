package com.nearme.services;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.nearme.mappers.UserMapper;
import com.nearme.models.dto.CreateUserRequestDTO;
import com.nearme.models.dto.ManageRoleDTO;
import com.nearme.models.dto.UserDTO;
import com.nearme.models.entities.PasswordResetTokenEntity;
import com.nearme.models.entities.UserEntity;
import com.nearme.models.types.RoleType;
import com.nearme.models.types.UserStatusType;
import com.nearme.repositories.PasswordTokenRepository;
import com.nearme.repositories.UserRepository;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordTokenRepository passwordTokenRepository;

    @Autowired
    AuthService authService;



    /**
     * Creates user in database
     * 
     * @param userDTO
     * @return
     */
    public UserDTO createUser(UserDTO userDTO) {
        if (userRepository.findByUsername(userDTO.getUsername()).isPresent()) {
            return UserMapper.INSTANCE.entityToDto(userRepository.findByUsername(userDTO.getUsername()).get());
        }
        UserEntity userEntity = UserMapper.INSTANCE.dtoToEntity(userDTO);
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String hashedPassword = passwordEncoder.encode(userDTO.getPassword());
        userEntity.setPassword(hashedPassword);
        userEntity.setStatus(UserStatusType.ENABLED);
        userEntity = userRepository.save(userEntity);
        UserDTO userCreated = UserMapper.INSTANCE.entityToDto(userEntity);
        userCreated.setPassword(null);
        return userCreated;
    }

	/**
	 * Update an existing user
	 * @param userDTO
	 * @return
	 */
	public UserDTO updateUser(CreateUserRequestDTO createUserRequestDTO) throws Exception {
		UserDetails user = authService.getLoggedUserDetail();
		UserEntity userEntity = userRepository.findByUsername(createUserRequestDTO.getEmail()).get();
		if(!user.getUsername().equals(userEntity.getUsername())) {
			log.info("Invalid update user request");
			return null;
		}
        userEntity.setName(createUserRequestDTO.getName());
        userEntity.setSurname(createUserRequestDTO.getSurname());
		userEntity = userRepository.save(userEntity);
        UserDTO userUpdated = UserMapper.INSTANCE.entityToDto(userEntity);
        userUpdated.setPassword(null);
        return userUpdated;
    }


    /**
	 * Gets users list
	 * 
	 * @return
	 * @throws Exception
	 */
	@Transactional
	public List<UserDTO> getUsers() throws Exception {
		List<UserEntity> usersList = userRepository.findAll();
		if (usersList.isEmpty()) {
			new Exception("No users found");
		}
		return UserMapper.INSTANCE.mapEntityToDtoList(usersList);
	}
	
    /**
	 * Gets user by id
	 * 
	 * @return
	 * @throws Exception
	 */
	@Transactional
	public UserDTO getUser(Integer id) {
		UserEntity user = userRepository.findById(id).get();
		return UserMapper.INSTANCE.entityToDto(user);
	}

	/**
	 * Assign role to user
	 * @param manageRoleDTO
	 * @throws UserServiceException
	 */
	public void assignRole(ManageRoleDTO manageRoleDTO) {
		UserEntity userEntity = userRepository.findById(manageRoleDTO.getIdUser()).get();
		List<String> roles = userEntity.getRoles();
		if(!roles.contains(manageRoleDTO.getRole())) {
			roles.add(manageRoleDTO.getRole());
			userEntity.setRoles(roles);
			this.userRepository.save(userEntity);
		}
	}
	
	/**
	 * Remove role of user
	 * @param manageRoleDTO
	 */
	public void removeRole(ManageRoleDTO manageRoleDTO) {
		UserEntity userEntity = userRepository.findById(manageRoleDTO.getIdUser()).get();
		List<String> roles = userEntity.getRoles();
		if(roles.contains(manageRoleDTO.getRole())) {
			roles.remove(manageRoleDTO.getRole());
			userEntity.setRoles(roles);
			this.userRepository.save(userEntity);
		}
	}

    /**
	 * Blocks user and invalidates related tokens
	 * @param blockUserDTO
	 * @return
     * @throws Exception
	 * @throws UserServiceException
	 */
	@Transactional
	public boolean blockUser(Integer idUser) throws Exception {

		if (this.userRepository.findById(idUser).isPresent()) {
			UserEntity userExisting = this.userRepository.findById(idUser).get();
			// get and remove related tokens
			ArrayList<PasswordResetTokenEntity> passwordTokens = passwordTokenRepository.findAllByUserEntity(userExisting);
			passwordTokens.forEach(token->{
				token.setUsed(true);
				passwordTokenRepository.save(token);
			});
			// set user enabled false
			userExisting.setStatus(UserStatusType.BLOCKED);
			userRepository.save(userExisting);
		}else {
			throw new Exception("User with id " + idUser + " doesn't exist.");
		}
		return true;
	}

	/**
	 * Unblocks user
	 * @param blockUserDTO
	 * @return
	 * @throws UserServiceException
	 */
	@Transactional
	public boolean unblockUser(Integer idUser) throws Exception {
		if (this.userRepository.findById(idUser).isPresent()) {
			UserEntity userExisting = this.userRepository.findById(idUser).get();
			if(userExisting.isAccountNonLocked()) {
				throw new Exception("User" + idUser + " is already unblocked.");
			}
			userExisting.setStatus(UserStatusType.DISABLED);
			userRepository.save(userExisting);
		} else {
			throw new Exception("User with id" + idUser + " doesn't exist.");
		}
		return true;
	}

	/**
	 * Creates password reset token
	 * 
	 * @return
	 * @throws UserServiceException
	 */
	@Transactional
	public PasswordResetTokenEntity createPasswordResetTokenForUser(UserEntity userEntity)  {
		String token = UUID.randomUUID().toString();
		PasswordResetTokenEntity myToken = new PasswordResetTokenEntity(token, userEntity, false);
		return passwordTokenRepository.save(myToken);
	}

    /**
	 * Resets userEntity password
	 * 
	 * @param token
	 * @param password
	 * @return
	 * @throws Exception
	 */
	@Transactional
	public boolean resetPassword(String token, String password) throws Exception {
		PasswordResetTokenEntity passwordToken = passwordTokenRepository.findByToken(token);
		if ((passwordToken != null) && (passwordToken.getUsed() == false)) {
			Calendar cal = Calendar.getInstance();
			if ((passwordToken.getExpiryDate().getTime() - cal.getTime().getTime()) <= 0) {
				throw new Exception("Expired token - please request a new one!");
			}
			UserEntity userEntity = passwordToken.getUserEntity();
			// encrypting password
			BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
			String hashedPassword = passwordEncoder.encode(password);
			userEntity.setPassword(hashedPassword);
			userEntity.setStatus(UserStatusType.ENABLED);
			// reset loggin attempts
			// userEntity.setLoginAttempts(0);
			this.userRepository.save(userEntity);
			passwordToken.setUsed(true);
			passwordTokenRepository.save(passwordToken);
			return true;
		} else {
			throw new Exception("Invalid token");
		}
	}

	/**
	 * Resets the password of the logged user
	 * @param userDTO
	 * @param password
	 * @param oldPassword
	 * @return
	 * @throws Exception
	 */
	@Transactional
	public boolean resetLoggedPassword(UserDTO userDTO, String password, String oldPassword) throws Exception {
			UserEntity userEntity = userRepository.findById(userDTO.getIdUser()).get();
			// echeck if passwords match
			BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
			if (passwordEncoder.matches(oldPassword, userEntity.getPassword())){
				// encrypt password
				String hashedPassword = passwordEncoder.encode(password);
				userEntity.setPassword(hashedPassword);
				// save new password for user
				this.userRepository.save(userEntity);
				return true;
			}else {
				throw new Exception("Invalid old password");
			}
	}

	/**
	 * Validates token
	 * @param token
	 * @return
	 * @throws Exception
	 */
	public boolean validateToken(String token) throws Exception {
		PasswordResetTokenEntity passwordToken = passwordTokenRepository.findByToken(token);
		if ((passwordToken != null) && (passwordToken.getUsed() == false)) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * Creates a new user
	 * @param createUserRequestDTO
	 * @return
	 * @throws Exception
	 */
	@Transactional
	public UserDTO createUser(CreateUserRequestDTO createUserRequestDTO) throws Exception {		
		UserDTO userToCreate = new UserDTO();
        // check if email exists
		if (this.userRepository.findByUsername(createUserRequestDTO.getEmail()).isPresent()) {
			log.warn("User with email " + createUserRequestDTO.getEmail() + " already exists");
			throw new Exception("User with email " + createUserRequestDTO.getEmail() + " already exists");
		} else {
			// set a temp password for new users
			log.info("Creating a new user - "+createUserRequestDTO.getEmail());
            // String password = new Random().ints(10, 33, 122).mapToObj(i -> String.valueOf((char)i)).collect(Collectors.joining());
			String password ="TOMATOE";
            userToCreate.setUsername(createUserRequestDTO.getEmail());
            userToCreate.setPassword(password);
			userToCreate.setName(createUserRequestDTO.getName());
			userToCreate.setSurname(createUserRequestDTO.getSurname());
			UserEntity userEntity = UserMapper.INSTANCE.dtoToEntity(userToCreate);
			userEntity.setStatus(UserStatusType.DISABLED);
			userEntity.setRoles(Arrays.asList(RoleType.ROLE_CLIENT.toString()));
			this.userRepository.save(userEntity);
			// send a password confirmation
			// log.info("Creating and sending a confirmation token email for user - "+createUserRequestDTO.getEmail());
			// PasswordResetTokenEntity token = createPasswordResetTokenForUser(userEntity);
			// emailSenderService.sendConfirmationEmail(userEntity.getUsername(), token.getToken());
			UserDTO userCreated = UserMapper.INSTANCE.entityToDto(userEntity);
			userCreated.setPassword(null);
			return userCreated; 
		} 
	}


	/**
	 * Get logged user 
	 * @return
	 */
	public UserDTO getLoggedUser() {
		try {
			UserDetails user = authService.getLoggedUserDetail();

			Optional<UserEntity> userEntity = userRepository.findByUsername(user.getUsername());
			if(userEntity.isPresent()) {
				return UserMapper.INSTANCE.entityToDto(userEntity.get());
			} else {
				return null;
			}
		} catch(Exception e) {
			if(e.getMessage()!= null){log.info("An error occurred on getting logged user: ", e.getMessage());} return null;
		}
	}


}