import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/model/product';
@Injectable()
export class PedidosService {
  constructor(private conexHttp: HttpClient) {}

  getAllPedidos(): Observable<any> {
    return this.conexHttp.get('/api/pedido/list', { responseType: 'text' });
  }

  getPedidoById(idPedido: Number): Observable<any> {
    return this.conexHttp.get('/api/pedido/id/' + idPedido, {
      responseType: 'text',
    });
  }
}
