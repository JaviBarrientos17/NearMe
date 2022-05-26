import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/model/product';
@Injectable()
export class CategoriesService {
  constructor(private conexHttp: HttpClient) {}

  getAllCategories(): Observable<any> {
    return this.conexHttp.get('/api/category/listMain', {
      responseType: 'text',
    });
  }
}
