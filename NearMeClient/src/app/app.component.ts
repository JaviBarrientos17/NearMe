import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Category } from 'src/model/category';
import { UserRoleType } from 'src/model/enums/user-role-type.enum';
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
  UserRoleType = UserRoleType;
  

  constructor(
    public router: Router,
    private authService: AuthenticationService,
    private _categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.currentUserValue;
 
    // console.log(this.user.name); checke comment
    this._categoriesService.getAllCategories().subscribe(
      (resul) => {
        this.categories = JSON.parse(resul);
        console.log('All Categories');
        console.log(resul);
        // console.log("Username: " + this.user.name);
      },
      (error) => {
        console.log('All Categories error');
        console.log(error);
      }
    );
  }

  logOut(): void {
    
  
    this.authService.logout();
  }
    /**
    *  checks if user is authorized or not depending on the role
    * @param role UserRoleType
    * @returns boolean
    */
     isAuthorized(role: UserRoleType): boolean {
      return this.authService.isAuthorized(role);
    }
  
}