import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/model/product';
@Injectable()
export class TiendasService {
  constructor(private conexHttp: HttpClient) {}

  getAllTiendas(): Observable<any> {
    return this.conexHttp.get('/api/suppliers/list', { responseType: 'text' });
  }

  getTiendaById(idTienda: Number): Observable<any> {
    return this.conexHttp.get('/api/suppliers/id/' + idTienda, {
      responseType: 'text',
    });
  }

  //Carga tiendas cuando en el buscador se pone su nombre
  getTiendasByName(tiendaName: String): Observable<any> {
    return this.conexHttp.get('/api/suppliers/');
  }

  //Carga la información de 1 sola tienda (VISTA PRODUCTO)
  getTiendaByName(tiendaName: String): Observable<any> {
    return this.conexHttp.get('');
  }
}
