import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable()
export class ProductsService {
  constructor(private conexHttp: HttpClient) {}

  getAllProducts(): Observable<any> {
    return this.conexHttp.get('https://fakestoreapi.com/products');
  }
}
