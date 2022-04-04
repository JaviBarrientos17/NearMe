import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/model/user';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers:[UsersService]
})
export class RegisterComponent {
  usersArray:Array<User> = [new User()];

  title:any = 'Register';
  userName:any = '';
  userSurname:any = '';
  userEmail:any = '';
  userPhoneNumber:any = '';
  userPass:any = '';
  userPass2:any = '';

  constructor(private usersService:UsersService, private _router: Router){}

  ngOnInit(): void {
    this.usersService.getAllUsers().subscribe(
      (resul) => {
        console.log("Users list: " + resul);
        this.usersArray = resul;
      },
      (error) => {
        console.log("Error: " + error);
      }
    );
  }
  
  // TODO DA UN ERROR 415 (UNSUPORTED MEDIA TYPE) AL HACER EL POST DEL INSERT USER
  insertUser() {
    console.log("Working...");
    this.usersService.insertUser(
      this.userName, this.userSurname, this.userPhoneNumber, this.userEmail, this.userPass, this.userPass2
    ).subscribe(
      (resul) => {
        console.log("Result: " + resul);
        this.usersArray = resul;
        this._router.navigate(['']);
      },
      (error) => {
        console.log("Error: " + error);
      }
    );
  }
}
