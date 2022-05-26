import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  title = 'NearMe';
  langs: string[] = [];
  selectedLanguage = 'es';

  public totalItem:number = 0;

  constructor(private translateService: TranslateService, private cartService: CartService) {
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
  }

  toogleLanguage(lang: string) {
    this.translateService.use(lang);
  }
}