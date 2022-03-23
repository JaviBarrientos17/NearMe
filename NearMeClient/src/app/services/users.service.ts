import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class UsersService {
    // url: string = "https://jsonplaceholder.typicode.com/users";

    constructor(private conexHttp: HttpClient) { }

    getAllUsers(): Observable<any> {
        return this.conexHttp.get("/api/users/list", { responseType: 'text' });
    }

    insertUser(user_name: string, user_email: string, user_password: string, user_password2: string): Observable<any> {
        let formData: FormData = new FormData();
        // TODO LOS NOMBRES DE CADA formData.append, DEBEN SER LOS MISMOS QUE LOS DEL BACKEND
        formData.append("", user_name);
        formData.append("", user_email);
        formData.append("", user_password);
        formData.append("", user_password2);

        // TODO FALTA AÑADIR ENDPOINT DE LA API
        return this.conexHttp.post("", formData);
    }
}