import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CartService } from "ng-shopping-cart";
import { Observable } from "rxjs";

@Injectable()
export class cartService {
    constructor(private cartService: CartService<any>) {}

    getItem(id: number): Observable<any> {
        return this.cartService.getItem(id);
    }

    // TODO PRINTAR LOS DATOS DEL PRODUCTO EN EL CARRITO
}