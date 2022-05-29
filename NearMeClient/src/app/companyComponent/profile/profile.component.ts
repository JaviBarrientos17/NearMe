import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'profileComponent-component',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.css'],
})
export class ProfileComponent implements OnInit {
  userName: string;
  constructor(private authService: AuthenticationService) { }

  //TODO

  ngOnInit() {
    this.userName = this.authService.currentUserValue.name;
    console.log(this.userName);
  }
  show = false;

}
