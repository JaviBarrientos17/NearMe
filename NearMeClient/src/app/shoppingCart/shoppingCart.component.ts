import { Component, OnInit } from "@angular/core";
import { Product } from "src/model/product";
import { CartService } from "../services/cart.service";
import { ProductsService } from "../services/products.service";

@Component({
    selector: 'shoppingCart-component',
    templateUrl: './shoppingCart.component.html',
    styleUrls: ['./shoppingCart.component.css'],
    providers: [ProductsService]
})
export class ShoppingCartComponent implements OnInit {
    products: Product | any = null;
    id:number = null;
    public product:any = [];
    public total!:number;

    constructor(
        private _productsService: ProductsService,
        private cartService : CartService
    ) {}

    ngOnInit(): void {
        this._productsService.getProductsById(this.id).subscribe(
            (resul) => {
                this.products = JSON.parse(resul);
                console.log('Product');
                console.log(this.products);
            },
            (error) => {
                console.log('Product error');
                console.log(error);
            }
        );
        this.cartService.getProducts()
        .subscribe(res => {
            this.product = res;
        });
    }

    removeItem(item:any) {
        this.cartService.removeCartItem(item);
    }

    emptyCart() {
        this.cartService.removeAllCartItem();
    }

    increaseQuantity(item:any) {
        console.log("Works!");
        this.cartService.increaseQuantity(item);
        this.total = this.cartService.getTotalPrice();
    }

    decreaseQuantity(item:any) {
        console.log("Works!");
        this.cartService.decreaseQuantity(item);
        this.total = this.cartService.getTotalPrice();
    }
}