import { Component } from '@angular/core';
import { Tienda } from 'src/model/tienda';

@Component({
  selector: 'app-root',
  templateUrl: './tiendas.component.html',
  styleUrls: ['./tiendas.component.css'],
})
export class TiendasComponent {
  title = 'Tiendas';
  tiendas: Array<Tienda> = [];
}
