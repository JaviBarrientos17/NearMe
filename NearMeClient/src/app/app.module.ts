import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './loginComponent/login.component';
import { HomeComponent } from './homeComponent/home.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CreateUserComponent } from './registerComponent/register.component';
import { TiendasComponent } from './tiendasComponent/tiendas.component';
import { ProductosComponent } from './productosComponent/productos.component';
import { DashboardComponent } from './companyComponent/dashboard/dashboard.component';
import { SearchBar } from './searchBarComponent/searchBar.component';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NavbarComponent } from './navbarComponent/navbar.component';
import { SidebarFiltrosComponent } from './sidebarFiltrosComponent/sidebarFiltros.component';
import { PremiumComponent } from './premiumComponent/premium.component';
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
import { MatRadioModule } from '@angular/material/radio';
import { ProductComponent } from './productComponent/product.component';
import { ProductList } from './companyComponent/productos/productList/productList.component';
import { ProfileComponent } from './companyComponent/profile/profile.component';
import { FormProductComponent } from './companyComponent/productos/formProduct/formProduct.components';
import { TiendaComponent } from './tiendaComponent/tienda.component';
import { ShoppingCartModule } from 'ng-shopping-cart';
import { ShoppingCartComponent } from './shoppingCart/shoppingCart.component';
import { CustomCardItem } from 'src/model/item';
import { SidenavComany } from './companyComponent/sidenav/sidenavCompany.component';
import { AboutUsComponent } from './footerComponent/aboutUs/aboutus.component';
import { PedidosList } from './companyComponent/pedidos/pedidosList/pedidosList.component';
import { VentasSemanalesComponent } from './companyComponent/charts/cirWeekSalesChart/ventasSemanales.component';
import { BarSalesChartComponent } from './companyComponent/charts/barSalesChart/barSalesChart.component';
import { FooterComponent } from './footerComponent/footer/footer.component';
import { SliderComponent } from './slider/slider.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    CreateUserComponent,
    TiendasComponent,
    ProductosComponent,
    DashboardComponent,
    SearchBar,
    NavbarComponent,
    FooterComponent,
    SidenavComany,
    SidebarFiltrosComponent,
    PremiumComponent,
    ShoppingCartComponent,
    ProductComponent,
    ProductList,
    ProfileComponent,
    FormProductComponent,
    TiendaComponent,
    AboutUsComponent,
    PedidosList,
    VentasSemanalesComponent,
    BarSalesChartComponent,
    SliderComponent,
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
    MatRadioModule,
    HttpClientModule,
    MatTabsModule,
    MatSidenavModule,
    MatPaginatorModule,
    MatTableModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatListModule,
    MatMenuModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    ShoppingCartModule.forRoot({
      itemType: CustomCardItem,
      serviceType: 'localStorage',
      serviceOptions: {
        storageKey: 'nearmeShoppingCart',
        clearOnError: true,
      },
    }),
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
