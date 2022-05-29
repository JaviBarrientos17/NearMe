import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserRoleType } from 'src/model/enums/user-role-type.enum';
import { AuthenticationService } from '../services/authentication.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  title = 'NearMe';
  langs: string[] = [];
  isLogged: boolean = true;
  selectedLanguage = 'es';
  UserRoleType = UserRoleType;
  public totalItem: number = 0;

  constructor(private translateService: TranslateService, private cartService: CartService, private authenticationService: AuthenticationService,) {
    this.translateService.setDefaultLang(this.selectedLanguage);
    this.translateService.use(this.selectedLanguage);

    this.translateService.addLangs(['es', 'en', 'ca']);
    this.langs = this.translateService.getLangs();
  }

  ngOnInit(): void {
    this.cartService.getProducts()
      .subscribe(res => {
        this.totalItem = res.length;
      });
    this.isLogged = this.authenticationService.currentUserIdValue != null;




  }

  toogleLanguage(lang: string) {
    this.translateService.use(lang);
  }
  /**
    *  checks if user is authorized or not depending on the role
    * @param role UserRoleType
    * @returns boolean
    */
  isAuthorized(role: UserRoleType): boolean {
    return this.authenticationService.isAuthorized(role);
  }


  /**
  * Checks if User is logged in 
  * 
  * @returns boolean
  */
  isLoggedIn(): boolean {
    let response = this.authenticationService.getLoggedUser();
    console.log("RESPONSEEE");
    console.log(response);
    return response != null;
  }

}