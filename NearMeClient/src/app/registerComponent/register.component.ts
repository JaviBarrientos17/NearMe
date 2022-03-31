import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers:[UsersService]
})
export class RegisterComponent {
  title = 'Register';
  userName = '';
  userSurname = '';
  userEmail = '';
  userPhoneNumber = '';
  userPass = '';
  userPass2 = '';

  constructor(private usersService:UsersService, private _router: Router){}

  insertUser() {
    console.log("insert user");
    //this.usersService.insertUser(this.userName, this.userEmail, this.userPass, this.userPass2);
  }
}
