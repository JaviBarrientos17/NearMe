import { Injectable } from "@angular/core";
import { BaseCartItem, CartService } from "ng-shopping-cart";

@Injectable()
export class cartService {
    constructor(private cartService: CartService<BaseCartItem>) {
        // console.log("cartService: \n" 
        //     + this.cartService.getItem('1').id
        //     + "\n" + this.cartService.getItem('1').name
        //     + "\n" + this.cartService.getItem('1').price
        //     + "\n" + this.cartService.getItem('1').quantity
        //     + "\n" + this.cartService.getItem('1').image
        // );
    }
}