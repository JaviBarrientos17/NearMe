import { Component, OnInit } from '@angular/core';
import { Tienda } from 'src/model/tienda';
import { ProductsService } from '../services/products.service';
import { TiendasService } from '../services/tiendas.service';

@Component({
  selector: 'app-root',
  templateUrl: './tiendas.component.html',
  styleUrls: ['./tiendas.component.css'],
  providers: [ProductsService, TiendasService],
})
export class TiendasComponent implements OnInit{
  title = 'Tiendas';
  tiendas: Array<Tienda> = [];

  constructor(private _tiendasServices: TiendasService) {}

  ngOnInit(): void {
    this._tiendasServices.getAllTiendas().subscribe(
      (resul) => {
        this.tiendas = JSON.parse(resul);
        console.log("Tiendas: " + this.tiendas);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
