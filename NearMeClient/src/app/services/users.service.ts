import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class UsersService {
  url: string = 'https://jsonplaceholder.typicode.com/users';

  constructor(private conexHttp: HttpClient) {}

  // TODO PREGUNTAR A CRISTIAN PORQUE NO ME HACE LA LLAMADA AL ENDPOINT DE LA API
  getAllUsers(): Observable<any> {
    return this.conexHttp.get('/api/users/list', { responseType: 'text' });
  }

  // TODO PREGUNTAR A CRISTIAN PORQUE NO ME HACE LA LLAMADA AL ENDPOINT DE LA API
  insertUser(
    user_name: string,
    user_surname: string,
    user_email: string,
    user_phoneNumber: number,
    user_password: string,
    user_repeatPassword: string,
  ): Observable<any> {
    let formData: FormData = new FormData();
    formData.append('username', user_name);
    formData.append('surname', user_surname);
    formData.append('userPhoneInput', user_phoneNumber.toString());
    formData.append('userEmailInput', user_email);
    formData.append('userPasswordInput', user_password);
    formData.append('userRepeatPasswordInput', user_repeatPassword);

    console.log("Username: " + user_name);
    console.log("User surname: " + user_surname);
    console.log("User phone: " + user_phoneNumber);
    console.log("User email: " + user_email);
    console.log("User password: " + user_password);
    console.log("User password repeated: " + user_repeatPassword);

    return this.conexHttp.post('/api/users/add-user', formData);
  }
}
//     // url: string = "https://jsonplaceholder.typicode.com/users";

//     constructor(private conexHttp: HttpClient) { }

//     getAllUsers(): Observable<any> {
//         return this.conexHttp.get("/api/users/list", { responseType: 'text' });
//     }

//     insertUser(user_name: string, user_email: string, user_password: string, user_password2: string): Observable<any> {
//         let formData: FormData = new FormData();
//         // TODO LOS NOMBRES DE CADA formData.append, DEBEN SER LOS MISMOS QUE LOS DEL BACKEND
//         formData.append("", user_name);
//         formData.append("", user_email);
//         formData.append("", user_password);
//         formData.append("", user_password2);

//         console.log("Username: " + user_name);
//         console.log("User email: " + user_email);
//         console.log("User password: " + user_password);
//         console.log("User password 2: " + user_password2);

//         // TODO FALTA AÑADIR ENDPOINT DE LA API
//         return this.conexHttp.post("", formData);
//     }
// }
