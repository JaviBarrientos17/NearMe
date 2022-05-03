import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/model/user';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UsersService],
})
export class LoginComponent {
  title = 'Login';
  username = '';
  password = '';

  usersArray: Array<User> = [new User()];

  constructor(private usersService: UsersService, private _router: Router) {}

  sendLoginUserData() {
    console.log('Send login user data');
    this.usersService.loginUser(this.username, this.password).subscribe(
      (resul) => {
        console.log('Loggged user: ' + resul);
        this.usersArray = resul;
        if (resul.state == 'Ok!') {
          this._router.navigate(['']);
          // TODO ADD TOKEN LOGIN
        } else {
          console.log('Error!');
        }
      },
      (error) => {
        console.log('Error: ' + error);
      }
    );
  }
}
