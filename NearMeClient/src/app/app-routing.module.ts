import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './companyComponent/profile/profile.component';
import { ProductList } from './companyComponent/productos/productList/productList.component';
import { DashboardComponent } from './companyComponent/dashboard/dashboard.component';
import { HomeComponent } from './homeComponent/home.component';
import { LoginComponent } from './loginComponent/login.component';
import { PremiumComponent } from './premiumComponent/premium.component';
import { ProductComponent } from './productComponent/product.component';
import { ProductosComponent } from './productosComponent/productos.component';
import { CreateUserComponent } from './registerComponent/register.component';
import { ShoppingCartComponent } from './shoppingCart/shoppingCart.component';
import { TiendaComponent } from './tiendaComponent/tienda.component';
import { TiendasComponent } from './tiendasComponent/tiendas.component';
import { FormProductComponent } from './companyComponent/productos/formProduct/formProduct.components';
import { AboutUsComponent } from './footerComponent/aboutUs/aboutus.component';
import { PedidosList } from './companyComponent/pedidos/pedidosList/pedidosList.component';
import { UserRoleType } from 'src/model/enums/user-role-type.enum';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: CreateUserComponent },
  { path: 'tiendas', component: TiendasComponent },
  { path: 'tienda', component: TiendaComponent },
  { path: 'productos', component: ProductosComponent },
  {
    path: 'dashboard', component: DashboardComponent, data: {
      roles: [UserRoleType.SUPPLIER, UserRoleType.ADMIN]
    },
  },
  { path: 'premium', component: PremiumComponent },
  { path: 'product/:idProduct', component: ProductComponent },
  { path: 'shoppingCart', component: ShoppingCartComponent },
  { path: 'dashboard/companyProfile', component: ProfileComponent },
  { path: 'dashboard/newProduct', component: FormProductComponent },
  { path: 'dashboard/productList', component: ProductList },
  { path: 'dashboard/pedidosList', component: PedidosList },
  { path: 'aboutus', component: AboutUsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
