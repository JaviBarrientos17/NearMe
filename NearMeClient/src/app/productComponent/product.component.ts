import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/model/product';
import { CartService } from '../services/cart.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'product-component',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [ProductsService],
})
export class ProductComponent implements OnInit {
  product: Product;
  productsRelated: Array<Product> = [];
  title = 'Product';
  id: Number = 0;
  category: Number = 0;
  subcategory: Number = 0;

  constructor(
    private _productsService: ProductsService,
    private _activeRoute: ActivatedRoute,
    private _router: Router,
    private _cartService: CartService
  ) {}

  ngOnInit(): void {
    this._activeRoute.paramMap.subscribe((params) => {
      this.id = Number.parseInt(params.get('idProduct') + '');
      console.log(this.id);
    });
    this._productsService.getProductsById(this.id).subscribe(
      (resul) => {
        this.product = resul;
        console.log('Product');
        console.log(this.product);
      },
      (error) => {
        console.log('Product error');
        console.log(error);
      }
    );
    // this.category = this.product.idCategory;
    // this.subcategory = this.product.idSubcategory;
    this._productsService
      .getProductsByCategory(this.category, this.subcategory)
      .subscribe(
        (resul) => {
          this.productsRelated = JSON.parse(JSON.stringify(resul));
          console.log('Product Related');
          console.log(this.productsRelated);
        },
        (error) => {
          console.log('Product error');
          console.log(error);
        }
      );
  }

  addToCart(product: any) {
    this._cartService.addToCart(product);
  }
}
