import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class CartService {
    public cartItemList:any = [];
    public productList = new BehaviorSubject<any>([]);

    cantidad = 1;

    constructor() {}

    getProducts() {
        return this.productList.asObservable();
    }

    setProduct(product:any) {
        this.cartItemList.push(...product);
        this.productList.next(this.cartItemList);
    }

    addToCart(product:any) {
        this.cartItemList.push(product);
        this.productList.next(this.cartItemList);
        this.getTotalPrice();
        console.log(this.cartItemList);
    }

    removeCartItem(product:any) {
        this.cartItemList.map((a:any, index:any) => {
            if(product.id === a.id) {
                this.cartItemList.splice(index, 1);
            }
        });
    }

    removeAllCartItem() {
        this.cartItemList = [];
        this.productList.next(this.cartItemList);
    }

    increaseQuantity(product:any) {
        console.log("Enters increase function");
        this.cartItemList.map((a:any) => {
            if(product.id === a.id) {
                this.cantidad += 1;
                this.getTotalPrice();
                console.log("Increased stock: " + this.cantidad);
                console.log(this.cartItemList);
            }
        });
    }

    decreaseQuantity(product:any) {
        console.log("Enters decrease function");
        this.cartItemList.map((a:any) => {
            if(product.id === a.id) {
                if(this.cantidad === 0) {
                    alert("Cannot be negative stock");
                } else {
                    this.cantidad -= 1;
                    this.getTotalPrice();
                    console.log("Decreased stock: " + this.cantidad);
                    console.log(this.cartItemList);
                }         
            }
        });
    }

    getTotalPrice(): number {
        let total = 0;
        this.cartItemList.map((a:any) => {
            // total += a.price;
            total = a.price * this.cantidad;
           // console.log(total);
        });
        return total;
    }
}