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
  
  // TODO DA UN ERROR 400 (BAD REQUEST) AL HACER EL POST DEL INSERT USER
  insertUser() {
    console.log("Working...");
    this.usersService.insertUser(
      this.userName, this.userSurname, this.userEmail, this.userPhoneNumber, this.userPass
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
