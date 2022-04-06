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
    surname: string, phone: number, userPass: string): Observable<any> {
      console.log("User email: " + email);
      console.log("User name: " + name);
      console.log("User surname: " + surname);
      console.log("User phone: " + phone);
      // console.log("User pass: " + userPass);

      return this.conexHttp.post('/api/users/add-user',new User(email,name,surname,phone), {
        headers: new HttpHeaders(
          { 'Content-Type': 'application/json' }
      )});
  }
}