import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/model/user';

@Injectable()
export class UsersService {
  constructor(private conexHttp: HttpClient) {}

  users=[new User("","","",0,"")];

  getAllUsers(): Observable<any> {
    return this.conexHttp.get('/api/users/list', { responseType: 'text' });
  }

  // TODO MIRAR PORQUE LA PASSWORD APARECE COMO TOMATOE POR DEFECTO
  insertUser(email: string, name: string, 
    surname: string, phone: number, password: string): Observable<any> {
      console.log("User email: " + email);
      console.log("User name: " + name);
      console.log("User surname: " + surname);
      console.log("User phone: " + phone);
      console.log("User pass: " + password);

      return this.conexHttp.post('/api/users/add-user',new User(email,name,surname,phone,password), {
        headers: new HttpHeaders(
          { 'Content-Type': 'application/json' }
      )});
  }

  // TODO MIRAR PORQUE DA ERROR badCredentialsError CUANDO
  // TODO EL USUARIO EXISTE EN LA BBDD (PREGUNTAR ALEIX)

  // TODO ANTES DE PREGUNTAR MIRAR PORQUE EL USUARIO LO RECIBE
  // TODO EL BACK COMO NULL
  /*
    TODO (PONER ESTO EN EL BACK) log.info("Signin user mail: " + data.getUsername());
		TODO (PONER ESTO EN EL BACK) log.info("Signin user password: " + data.getPassword());
  */
  loginUser(email: string, password: string): Observable<any> {
    console.log("Login user");
    console.log("Email: " + email);
    console.log("Password: " + password);

    return this.conexHttp.post(
      "/api/auth/signin", new User(email, "", "", 0, password),
      {headers:new HttpHeaders(
        {'Content-Type': 'application/json'}
    )});
  }
}