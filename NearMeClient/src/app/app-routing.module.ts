import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './company/profileComponent/profile.component';
import { ProductList } from './company/productList/productList.component';
import { DashboardComponent } from './dashboardComponent/dashboard.component';
import { HomeComponent } from './homeComponent/home.component';
import { LoginComponent } from './loginComponent/login.component';
import { PremiumComponent } from './premiumComponent/premium.component';
import { ProductComponent } from './productComponent/product.component';

import { ProductosComponent } from './productosComponent/productos.component';
import { RegisterComponent } from './registerComponent/register.component';
import { ShoppingCartComponent } from './shoppingCart/shoppingCart.component';
import { TiendaComponent } from './tiendaComponent/tienda.component';
import { TiendasComponent } from './tiendasComponent/tiendas.component';
import { FormProductComponent } from './company/formProduct/formProduct.components';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'tiendas', component: TiendasComponent },
  { path: 'tienda', component: TiendaComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'premium', component: PremiumComponent },
  { path: 'product/:idProduct', component: ProductComponent },
  { path: 'shoppingCart', component: ShoppingCartComponent },
  { path: 'dashboard/companyProfile', component: ProfileComponent },
  { path: 'dashboard/newProduct', component: FormProductComponent },
  { path: 'dashboard/productList', component: ProductList },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
