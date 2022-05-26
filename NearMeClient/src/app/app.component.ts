import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/model/user.model';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'NearMe';
  user: User;
  constructor(
    public router: Router,
    private authService: AuthenticationService
  ) {}
  ngOnInit(): void {
    this.user = this.authService.currentUserValue;
    console.log(this.user.name);
  }
}
