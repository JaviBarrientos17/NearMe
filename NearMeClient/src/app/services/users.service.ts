import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class UsersService{
    url:string = "https://jsonplaceholder.typicode.com/users";

    constructor(private conexHttp:HttpClient){}

    getAllUsers():Observable<any> {
        return this.conexHttp.get(this.url);
    }
}