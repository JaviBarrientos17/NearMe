package com.nearme.models.dto;


import java.util.ArrayList;
import java.util.List;
import javax.validation.constraints.Size;
import com.nearme.models.types.UserStatusType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

    
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    Integer idUser;
    @Size(min = 0, max = 250)
    String mail;
    @Size(min = 0, max = 250)
    String username;
    @Size(min = 0, max = 250)    
    String name;
    @Size(min = 0, max = 250)    
    String surname;
    UserStatusType status;
    String password;
    List<String> roles = new ArrayList<String>();
}


