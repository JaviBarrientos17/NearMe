import { Component } from '@angular/core';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers:[UsersService]
})
export class DashboardComponent {
  title = 'Dashboard';
  
  constructor(private usersService:UsersService){}

  ngOnInit():void {
    console.log("Get all users");
    this.usersService.getAllUsers().subscribe(
      response => console.log(response)
    );
  }
}