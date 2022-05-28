import { Component } from '@angular/core';
import { Tienda } from 'src/model/tienda';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-root',
  templateUrl: './tiendas.component.html',
  styleUrls: ['./tiendas.component.css'],
  providers: [ProductsService],
})
export class TiendasComponent {
  title = 'Tiendas';
  tiendas: Array<Tienda> = [];
}
