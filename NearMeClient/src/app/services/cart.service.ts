import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cartItemList: any = [];
  public productList = new BehaviorSubject<any>([]);
  total!: number;
  cantidad = 1;
  constructor() {}

  getProducts() {
    return this.productList.asObservable();
  }

  setProduct(product: any) {
    this.cartItemList.push(...product);
    this.productList.next(this.cartItemList);
  }

  addToCart(product: any) {
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
    console.log(this.cartItemList);
  }

  removeCartItem(product: any) {
    this.cartItemList.map((a: any, index: any) => {
      if (product.id === a.id) {
        this.cartItemList.splice(index, 1);
      }
    });
  }

  removeAllCartItem() {
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
  }

  increaseQuantity(product: any) {
    console.log('Enters increase function');
    this.cartItemList.map((a: any) => {
      if (product.id === a.id) {
        this.cantidad += 1;
        this.getTotalPrice();
        console.log('Increased cantidad: ' + this.cantidad);
        console.log(this.cartItemList);
      }
    });
  }

  decreaseQuantity(product: any) {
    console.log('Enters decrease function');
    this.cartItemList.map((a: any) => {
      if (product.id === a.id) {
        if (this.cantidad === 0) {
          alert('Cannot be negative stock');
        } else {
          this.cantidad -= 1;
          this.getTotalPrice();
          console.log('Decreased stock: ' + this.cantidad);
          console.log(this.cartItemList);
        }
      }
    });
  }

  getTotalPrice(): number {
    if (this.total < 0) {
      alert('The price cannot be negative');
    } else {
      this.cartItemList.map((a: any) => {
        this.total += a.price;
        this.total = a.price * this.cantidad;
      });
    }
    return this.total;
  }
}
