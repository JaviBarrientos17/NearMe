import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'dashboard-component',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [UserService],
})
export class DashboardComponent implements OnInit {
  title = 'Dashboard';

  constructor(private usersService: UserService) {}

  ngOnInit(): void {
    console.log('Get all users');
    this.usersService
      .getUsers()
      .subscribe((response) => console.log(response));
  }
}
