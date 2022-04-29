import { Component, Injectable } from '@angular/core';
import { BaseCartItem } from 'ng-shopping-cart';
import { cartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './shoppingCart.component.html',
  styleUrls: ['./shoppingCart.component.css'],
  // TODO MIRAR ESTE ERRRO  NullInjectorError: No provider for cartService!
  providers: [BaseCartItem, cartService],
})

export class ShoppingCartComponent {
  title = 'ShoppingCart';
  item = new BaseCartItem();

  constructor(private cartService:cartService) {}

  ngOnInit(): void {
    // TODO SETEAR AL ITEM LOS VALORES DE LA BBDD
    // TODO PASAR TODO LO DE LA LIBRERIA DEL SHOPPING CART EN EL MODELO ITEM AL MODELO PRODUCTO

    // TODO PARA EL MIERCOLES: PASAR ID DEL PRODUCTO A TRAVÉS DEL BOTÓN DE COMPRAR AL CARRITO Y AVANZAR MEMORIA
    this.item.setId(1);
    this.item.setName("TestItem");
    this.item.setPrice(10);
    this.item.setQuantity(1);
    this.item.setImage("https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500");
    
    console.log(JSON.parse(JSON.stringify(this.item)));
  }
}