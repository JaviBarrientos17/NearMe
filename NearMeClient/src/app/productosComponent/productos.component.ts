import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/model/product';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'prodcuctos-component',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
  providers: [ProductsService],
})
export class ProductosComponent implements OnInit {
  products: Array<Product> = [];
  objectKeys = Object.keys;

  productName: String = '';
  constructor(
    private _productsService: ProductsService,
    private _activeRoute: ActivatedRoute,
    private _router: Router
  ) {}
  title = 'Productos';

  ngOnInit(): void {
    // this._activeRoute.paramMap.subscribe((params) => {
    // this.productName = params.get('productName') + '';
    // console.log(this.productName);
    // if (this.productName) {
    //   this._productsService.getProductByName(this.productName).subscribe(
    //     (resul) => {
    //       this.products = resul;
    //       console.log('Producto by name');
    //       console.log(resul);
    //       console.log(this.productName);
    //     },
    //     (error) => {
    //       console.log('Product by name error');
    //       console.log(error);
    //     }
    //   );
    // } else {
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

  //getProductsByName(productName: String) {}
}
