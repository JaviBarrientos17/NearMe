import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/model/product';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'productos-component',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
  providers: [ProductsService],
})
export class ProductosComponent implements OnInit {
  products: Array<Product> = [];
  objectKeys = Object.keys;
  idCategory: Number = 0;
  parent: Number = 0;

  productName: String = '';
  constructor(
    private _productsService: ProductsService,
    private _activeRoute: ActivatedRoute,
    private _router: Router
  ) {}
  title = 'Productos';

  ngOnInit(): void {
    this._activeRoute.paramMap.subscribe((params) => {
      this.idCategory = Number.parseInt(params.get('idCategory') + '');
      this.parent = Number.parseInt(params.get('parent') + '');
      console.log(this.idCategory);

      if (this.idCategory) {
        console.log('productsByCategory');
        this._productsService.getProductsByCategory(this.idCategory, this.parent).subscribe(
          (resul) => {
            // this.products = JSON.parse(resul);
            console.log('Products by category');
            console.log(resul);
          },
          (error) => {
            console.log('Products by category error');
            console.log(error);
          }
        );
      } else {
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
      }
    });
  }
}
