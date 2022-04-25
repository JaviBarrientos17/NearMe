import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/model/product';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'product-component',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [ProductsService],
})
export class ProductComponent implements OnInit {
  product: Product | any = null;
  title = 'Product';
  id: Number = 0;
  constructor(
    private _productsService: ProductsService,
    private _activeRoute: ActivatedRoute,
    private _router: Router
  ) {}
  ngOnInit(): void {
    this._activeRoute.paramMap.subscribe((params) => {
      this.id = Number.parseInt(params.get('idProduct') + '');
      console.log(this.id);
    });
    this._productsService.getProductsById(this.id).subscribe(
      (resul) => {
        this.product = JSON.parse(resul);
        console.log('Product');
        console.log(this.product);
      },
      (error) => {
        console.log('Product error');
        console.log(error);
      }
    );
  }
}
