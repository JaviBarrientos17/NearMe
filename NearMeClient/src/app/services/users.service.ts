import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class UsersService{
    constructor(private conexHttp:HttpClient){}

    // TODO CREAR FUNCIONES QUE APUNTEN A LA BBDD

    selectAllUsers():Observable<any>{
        return this.conexHttp.get(
            "",
            {headers:new HttpHeaders(
                {'Content-Type':'application/json'})
            }
        );
    }

    insertNewUser():Observable<any>{
        let formData:FormData = new FormData;

        return this.conexHttp.post(
            "", formData
        );
    }

    getUser():Observable<any>{
        return this.conexHttp.get(
            "",
            {headers:new HttpHeaders(
                {'Content-Type':'application/json'})
            }
        );
    }
}