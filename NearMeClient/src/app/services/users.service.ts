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

  // TODO INVESTIGAR SI EN VEZ DE USERNAME SE LE ESTÁ ENVIANDO EL CAMPO EMAIL

  loginUser(username: string, password: string): Observable<any> {
    console.log("Login user");
    console.log("Email: " + username);
    console.log("Password: " + password);
    let u = new User(username, "", "", 0, password);
    u.username=username;

    // TODO INSERTED USERNAME (ALSO EMAIL), AND PASSWORD
    console.log("Form data:\n" +"Username: " + u.username + "\n" + "Email: " + u.email + "\n" + "Password: " + u.password);

    return this.conexHttp.post(
      "/api/auth/signin", u,
      {headers:new HttpHeaders(
        {'Content-Type': 'application/json'}
    )});
  }
}