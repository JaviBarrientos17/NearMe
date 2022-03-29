import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/model/product';
@Injectable()
export class ProductsService {
  constructor(private conexHttp: HttpClient) {}

  getAllProducts(): Observable<any> {
    return this.conexHttp.get('/api/products/list', { responseType: 'text' });
  }

  //Carga productos cuando en el buscador se pone su nombre
  getProductsByName(productName: String): Observable<any> {
    return this.conexHttp.get('/api/products/');
  }

  //Carga la información de 1 solo proudcto (VISTA PRODUCTO)
  getProductByName(productName: String): Observable<any> {
    return this.conexHttp.get('');
  }

  //Carga productos si se busca una categoria en buscador
  getProductsByCategory(productCategory: String): Observable<any> {
    return this.conexHttp.get('');
  }

  //Carga los productos que coincidan con los filtros seleccionados
  // getProductByFilter(productFilters: Array<Filtros>): Observable<any> {
  //   return this.conexHttp.get('');
  // }

  //Añadir 1 Producto desde el dashboard
  addProductByForm(data: Product) {}

  //Añadir productos mediante CSV
  addProductsByCsv() {}
}
