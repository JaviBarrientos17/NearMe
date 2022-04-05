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

  insertUser(userName: string, userSurname: string, 
    userEmail: string, userPhoneNumber: number, userPass: string): Observable<any> {
      console.log("User name: " + userName);
      console.log("User surname: " + userSurname);
      console.log("User email: " + userEmail);
      console.log("User phone: " + userPhoneNumber.toString());
      console.log("User pass: " + userPass);

      return this.conexHttp.post('/api/users/add-user',new User(userName,userSurname,userEmail,userPhoneNumber,userPass), {
        headers: new HttpHeaders(
          { 'Content-Type': 'application/json' }
      )});
  }
  // TODO CÓDIGO ANTIGUO CON FORMDATA
  // // TODO PREGUNTAR A CRISTIAN PORQUE NO ME HACE LA LLAMADA AL ENDPOINT DE LA API
  // insertUser(
  //   user_name: string,
  //   user_surname: string,
  //   user_email: string,
  //   user_phoneNumber: number,
  //   user_password: string,
  //   user_repeatPassword: string,
  // ): Observable<any> {
  //   let formData: FormData = new FormData();
  //   formData.append('username', user_name);
  //   formData.append('surname', user_surname);
  //   formData.append('userPhoneInput', user_phoneNumber.toString());
  //   formData.append('userEmailInput', user_email);
  //   formData.append('userPasswordInput', user_password);
  //   formData.append('userRepeatPasswordInput', user_repeatPassword);

  //   console.log("User name: " + user_name);
  //   console.log("User surname: " + user_surname);
  //   console.log("User email: " + user_email);
  //   console.log("User phone: " + user_phoneNumber);
  //   console.log("User password: " + user_password);
  //   console.log("User password repeated: " + user_repeatPassword);

  //   return this.conexHttp.post('/api/users/add-user', formData);
  // }
}