import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  ngOnInit(): void {}
  title = 'NearMe';
  langs: string[] = [];
  selectedLanguage = 'es';

  constructor(private translateService: TranslateService) {
    this.translateService.setDefaultLang(this.selectedLanguage);
    this.translateService.use(this.selectedLanguage);
    this.translateService.addLangs(['es', 'en', 'ca']);
    this.langs = this.translateService.getLangs();
  }

  toogleLanguage(lang: string) {
    this.translateService.use(lang);
  }
}
