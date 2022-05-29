import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'dashboard-component',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [UserService],
})
export class DashboardComponent implements OnInit {
  title = 'Dashboard';
  userName:String = "";
  constructor(private usersService: UserService,   private authService: AuthenticationService,) {}

  ngOnInit(): void {
    console.log('Get all users');
    this.usersService.getUsers().subscribe((response) => console.log(response));
    this.userName = this.authService.currentUserValue.name;
    console.log(this.userName);
  }
}
