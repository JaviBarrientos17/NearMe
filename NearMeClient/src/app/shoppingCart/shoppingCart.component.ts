import { Component, OnInit } from '@angular/core';
import { Product } from 'src/model/product';
import { CartService } from '../services/cart.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'shoppingCart-component',
  templateUrl: './shoppingCart.component.html',
  styleUrls: ['./shoppingCart.component.css'],
  providers: [ProductsService],
})
export class ShoppingCartComponent implements OnInit {
  products: Product | any = null;
  id: number = null;
  product: any = [];
  total!: number;
  shippment: number = 20;
  totalShipp: number = this.total + this.shippment;
  cantidad = 1;

  constructor(
    private _productsService: ProductsService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.cartService.getProducts().subscribe((res) => {
      this.product = res;
      console.log(this.product);
    });
  }

  removeItem(item: any) {
    this.cartService.removeCartItem(item);
  }

  emptyCart() {
    this.cartService.removeAllCartItem();
  }

  increaseQuantity(item: any) {
    console.log('Works!');
    this.cartService.increaseQuantity(item);
    this.total = this.cartService.getTotalPrice();
    console.log(this.total);
    this.cantidad++;
  }

  decreaseQuantity(item: any) {
    console.log('Works!');
    this.cartService.decreaseQuantity(item);
    this.total = this.cartService.getTotalPrice();
    console.log(this.total);
    this.cantidad--;
  }
}
