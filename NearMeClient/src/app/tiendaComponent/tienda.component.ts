import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tienda } from 'src/model/tienda';
import { TiendasService } from '../services/tiendas.service';

@Component({
  selector: 'app-root',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css'],
  providers: [TiendasService],
})
export class TiendaComponent implements OnInit {
  title = 'Tienda';
  tienda:Tienda;
  idSupplier: Number = 0;

  constructor(private _tiendasService : TiendasService, private _activeRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this._activeRoute.paramMap.subscribe((params) => {
      this.idSupplier = Number.parseInt(params.get('idSupplier') + '');
      console.log(this.idSupplier);
    });
    this._tiendasService.getAllTiendasSupplierId(this.idSupplier).subscribe(
      (resul) => {
        console.log(resul);
        this.tienda = resul;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
