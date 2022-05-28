import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Category } from 'src/model/category';
import { User } from 'src/model/user.model';
import { AuthenticationService } from './services/authentication.service';
import { CategoriesService } from './services/categories.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [CategoriesService],
})
export class AppComponent implements OnInit {
  categories:Array<any> = [];
  title = 'NearMe';
  user: User;
  
  constructor(
    public router: Router,
    private authService: AuthenticationService,
    private _categoriesService: CategoriesService
  ) {}

    prueba: Array<any> = [2,3,4,5,6,7,8,9,10];

  ngOnInit(): void {
    this.user = this.authService.currentUserValue;
    console.log(this.user.name);
    this._categoriesService.getAllCategories().subscribe(
      (resul) => {
        this.categories = JSON.parse(resul);
        console.log('All Categories');
        console.log(resul);
      },
      (error) => {
        console.log('All Categories error');
        console.log(error);
      }
    );
  }


  logOut(): void {
    this.user = this.authService.logout();
  }
}

