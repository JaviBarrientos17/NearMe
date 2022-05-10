import { Component, Injectable } from '@angular/core';
import { BaseCartItem, CheckoutPaypalSettings } from 'ng-shopping-cart';
import { cartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './shoppingCart.component.html',
  styleUrls: ['./shoppingCart.component.css'],
  providers: [BaseCartItem, cartService],
})

export class ShoppingCartComponent {
  title = 'ShoppingCart';
  cartItems = new BaseCartItem();

  // create array of BaseCartItem
  cartItemsArray = [
    new BaseCartItem({
      id: this.cartItems.getId(),
      name: this.cartItems.getName(),
      price: this.cartItems.getPrice(),
      quantity: this.cartItems.getQuantity(),
      image: this.cartItems.getImage(),
    }),
  ];

  ngOnInit(): void {
    // TODO SETEAR AL ITEM LOS VALORES DE LA BBDD
    // TODO PASAR TODO LO DE LA LIBRERIA DEL SHOPPING CART EN EL MODELO ITEM AL MODELO PRODUCTO
    
    this.cartItems.setName("TestItem");
    this.cartItems.setPrice(10);
    this.cartItems.setQuantity(1);
    this.cartItems.setImage("https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500");
    this.cartItems.setId(1);
    
    console.log(JSON.parse(JSON.stringify(this.cartItems)));
  }
}