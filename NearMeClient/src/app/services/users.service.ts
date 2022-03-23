import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class UsersService{
    url:string = "https://jsonplaceholder.typicode.com/users";

    constructor(private conexHttp:HttpClient){}

    getAllUsers():Observable<any> {
        return this.conexHttp.get("/api/users/list", {responseType: 'text'});
    }

    insertUser(user_id:number, user_email:string, user_password:string,
        last_password_gen:string, user_type:number):Observable<any>{
            let formData:FormData = new FormData();
            formData.append("userEmailInput", user_email);
            formData.append("userPasswordInput", user_password);

            return this.conexHttp.post("", formData);
        }
}