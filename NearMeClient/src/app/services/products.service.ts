import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/model/product';
@Injectable()
export class ProductsService {
  constructor(private conexHttp: HttpClient) {}

  getAllProducts(): Observable<any> {
    return this.conexHttp.get('/api/product/list', { responseType: 'text' });
  }

  //Carga productos cuando en el buscador se pone su nombre
  getProductsById(idProduct: Number) {
    return this.conexHttp.get<Product>('/api/product/id/' + idProduct);
  }

  //Carga productos cuando en el buscador se pone su nombre
  getProductsByName(productName: String): Observable<any> {
    return this.conexHttp.get('/api/product/');
  }

  //Carga la información de 1 solo proudcto (VISTA PRODUCTO)
  getProductByName(productName: String): Observable<any> {
    return this.conexHttp.get('');
  }

  //Carga productos si se busca una categoria en buscador
  getProductsByCategory(idCategory: Number, parent: Number): Observable<any> {
    return this.conexHttp.get('/api/product/category/' + idCategory + '/' + parent);
  }

  //Carga los productos que coincidan con los filtros seleccionados
  // getProductByFilter(productFilters: Array<Filtros>): Observable<any> {
  //   return this.conexHttp.get('');
  // }

  //Añadir 1 Producto desde el dashboard
  addProductByForm(product: Product): Observable<any> {
    return this.conexHttp.post('/api/product/', +product);
  }
  //Añadir productos mediante CSV
  addProductsByCsv() {}

  updateProduct(product: Product) {
    return this.conexHttp.put('/api/product/update/', product);
  }

  deleteProduct(idProduct: Number) {
    return this.conexHttp.delete('/api/product/' + idProduct);
  }
}
