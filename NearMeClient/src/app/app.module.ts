import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatTabsModule } from '@angular/material/tabs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './loginComponent/login.component';
import { HomeComponent } from './homeComponent/home.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './registerComponent/register.component';
import { TiendasComponent } from './tiendasComponent/tiendas.component';
import { ProductosComponent } from './productosComponent/productos.component';
import { DashboardComponent } from './dashboardComponent/dashboard.component';
import { SearchBar } from './searchBarComponent/searchBar.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NavbarComponent } from './navbarComponent/navbar.component';
import { FooterComponent } from './footerComponent/footer.component';
import { SidebarFiltrosComponent } from './sidebarFiltrosComponent/sidebarFiltros.component';
import { PremiumComponent } from './premiumComponent/premium.component';
import { ShoppingCartComponent } from './shoppingCart/shoppingCart.component';
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

import { ProductComponent } from './productComponent/product.component';
import { CompanyProfileComponent } from './company/companyProfileComponent/companyProfile.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    TiendasComponent,
    ProductosComponent,
    DashboardComponent,
    SearchBar,
    NavbarComponent,
    FooterComponent,
    SidebarFiltrosComponent,
    PremiumComponent,
    ShoppingCartComponent,
    ProductComponent,
    CompanyProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    MatInputModule,
    HttpClientModule,
    MatTabsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
