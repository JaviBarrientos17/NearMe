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
  email:any = '';
  name:any = '';
  surname:any = '';
  phone:any = '';
  password:any = '';

  constructor(private usersService:UsersService, private _router: Router){}

  ngOnInit(): void {
    this.usersService.getAllUsers().subscribe(
      (resul) => {
        // console.log("Users list: " + resul);
        this.usersArray = resul;
      },
      (error) => {
        console.log("Error: " + error);
      }
    );
  }
  
  insertUser() {
    console.log("Working...");
    this.usersService.insertUser(
      this.email, this.name, this.surname, this.phone, this.password
    ).subscribe(
      (resul) => {
        console.log("User inserted data: " + resul);
        this.usersArray = resul;
        this._router.navigate(['']);
      },
      (error) => {
        console.log("Error: " + error);
      }
    );
  }
}
