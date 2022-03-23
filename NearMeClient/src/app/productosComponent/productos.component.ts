import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from 'src/model/product';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-root',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
  providers: [ProductsService],
})
export class ProductosComponent implements OnInit {
  productos: Array<Product> = [];
  constructor(
    private productsService: ProductsService,
    private _activeRoute: ActivatedRoute,
    private _router: Router
  ) {}
  title = 'Productos';

  ngOnInit(): void {
    console.log('GET PRODUCTS');
    this.productsService
      .getAllProducts()
      .subscribe((response) => console.log(response));
  }

  getProductsByName(productName: String) {}
}
