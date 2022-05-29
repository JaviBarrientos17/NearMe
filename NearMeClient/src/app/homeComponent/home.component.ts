import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/model/category';
import { Product } from 'src/model/product';
import { Tienda } from 'src/model/tienda';
import { CategoriesService } from '../services/categories.service';
import { ProductsService } from '../services/products.service';
import { TiendasService } from '../services/tiendas.service';

@Component({
  selector: 'app-root',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  providers: [CategoriesService, ProductsService, TiendasService],
})
export class HomeComponent implements OnInit {
  title = 'Home';
  // idCategory: Number = 0;
  categories: Array<Category> = [];
  products: Array<Product> = [];
  tiendas: Array<Tienda> = [];
  constructor(
    private _categoriesService: CategoriesService,
    private _productsService: ProductsService,
    private _tiendasService: TiendasService
  ) {}
  ngOnInit(): void {
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
    this._productsService.getAllProducts().subscribe(
      (resul) => {
        this.products = JSON.parse(resul);
        console.log('All products');
        console.log(resul);
      },
      (error) => {
        console.log('All products error');
        console.log(error);
      }
    );
    this._tiendasService.getAllTiendas().subscribe(
      (resul) => {
        this.tiendas = JSON.parse(resul);
        console.log('All tiendas');
        console.log(resul);
      },
      (error) => {
        console.log('All tiendas error');
        console.log(error);
      }
    );
  }
}
