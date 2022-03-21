import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-root',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
  providers: [ProductsService],
})
export class ProductosComponent implements OnInit {
  constructor(private productsService: ProductsService) {}
  ngOnInit(): void {
    console.log('GET PRODUCTS');
    this.productsService
      .getAllProducts()
      .subscribe((response) => console.log(response));
  }
  title = 'Productos';
}
