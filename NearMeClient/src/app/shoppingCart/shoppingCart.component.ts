import { Component, Injectable } from '@angular/core';
import { BaseCartItem } from 'ng-shopping-cart';
import { cartService } from 'src/app/services/cart.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-root',
  templateUrl: './shoppingCart.component.html',
  styleUrls: ['./shoppingCart.component.css'],
  providers: [BaseCartItem, ProductsService, cartService],
})

export class ShoppingCartComponent {
  title = 'ShoppingCart';
  cartItems = new BaseCartItem();
  total = 0;
  idItem:any = 1;
  nameItem: string = "";
  priceItem: number = 0;
  quantityItem: number = 1;
  imageItem: string = "";

  cartItemsArray = [
    new BaseCartItem({
      id: this.cartItems.getId(),
      name: this.cartItems.getName(),
      price: this.cartItems.getPrice(),
      quantity: this.cartItems.getQuantity(),
      image: this.cartItems.getImage(),
    }),
  ];

  constructor(private cartService: cartService, private productService: ProductsService) {}

  ngOnInit(): void {
    // TODO SETEAR AL ITEM LOS VALORES DE LA BBDD
    // TODO PASAR TODO LO DE LA LIBRERIA DEL SHOPPING CART EN EL MODELO ITEM AL MODELO PRODUCTO
    
    // this.cartItems.setName("TestItem");
    // this.cartItems.setPrice(10);
    // this.cartItems.setQuantity(1);
    // this.cartItems.setImage("https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500");
    // this.cartItems.setId(1);

    // TODO COMPROBAR SI RECIBE LOS DATOS DEL PRODUCTO
    this.productService.getProductsById(this.idItem).subscribe(
      (data) => {
        // this.cartItems.setName(
        //   this.productService.getProductsById(this.idProduct: Number).subscribe(
        //     (data) => {
        //     },
        //     (error) => {
        //       console.log(error);
        //     },
        //   )
        // );

        this.cartItems.setId(this.idItem);
        this.cartItems.setName(this.nameItem);
        this.cartItems.setPrice(this.priceItem);
        this.cartItems.setQuantity(this.quantityItem);
        this.cartItems.setImage(this.imageItem);

        // this.cartItems.setId("1");
        // this.cartItems.setName("Zapas Nike");
        // this.cartItems.setPrice(10);
        // this.cartItems.setQuantity(1);
        // this.cartItems.setImage("https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500");

        console.log(JSON.parse(JSON.stringify(this.cartItems)));

        // TODO FUNCIONA, PERO LOS DATOS LOS DEBE RECIBIR DE LA BBDD
        this.total = this.cartItems.getPrice() * this.cartItems.getQuantity();
        console.log(this.total);
      },(error) => {
        console.log(error);
      }
    );
  }
}