import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboardComponent/dashboard.component';
import { HomeComponent } from './homeComponent/home.component';
import { LoginComponent } from './loginComponent/login.component';
import { PremiumComponent } from './premiumComponent/premium.component';
import { ProductosComponent } from './productosComponent/productos.component';
import { RegisterComponent } from './registerComponent/register.component';
import { ShoppingCartComponent } from './shoppingCart/shoppingCart.component';
import { TiendasComponent } from './tiendasComponent/tiendas.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'tiendas', component: TiendasComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'premium', component: PremiumComponent },
  { path: 'shoppingCart', component: ShoppingCartComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
