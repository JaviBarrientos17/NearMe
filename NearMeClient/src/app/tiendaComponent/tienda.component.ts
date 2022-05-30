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
  tienda: Tienda;
  idSupplier: Number = 0;
  mapsTienda: String = '';
  constructor(
    private _tiendasService: TiendasService,
    private _activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._activeRoute.paramMap.subscribe((params) => {
      this.idSupplier = Number.parseInt(params.get('idSupplier') + '');
      console.log(this.idSupplier);
    });
    this._tiendasService.getAllTiendasSupplierId(this.idSupplier).subscribe(
      (resul) => {
        this.tienda = resul;
        console.log('Tienda');
        console.log(resul);
        // let geo = this.tienda.name.replace(/ /g, '%20');
        // this.geolite =
        //   'https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=es&amp;q=' +
        //   geo +
        //   '+()&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed';

        // console.log(this.geolite);
        // console.log(geo);
        this.issetMap();
      },
      (error) => {
        console.log('Tienda error');
        console.log(error);
      }
    );
  }
  issetMap() {
    let map = this.tienda.name.replace(/ /g, '%20');
    this.mapsTienda =
      'https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=es&amp;q=' +
      map +
      '&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed';
    if (this.mapsTienda != '') {
      return true;
      console.log('true');
    } else {
      return false;
      console.log('false');
    }
  }
}

// https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=es&amp;q=FerreteriaDecoferCataluña&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed

// https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=es&amp;q=Ferreteria%20Decofer+()&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed
// "https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=es&amp;q=Les%20Rambles+()&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.gps.ie/car-satnav-gps/"
// <div style="width: 100%">
//   <iframe
//     width="100%"
//     height="600"
//     frameborder="0"
//     scrolling="no"
//     marginheight="0"
//     marginwidth="0"
//     src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=es&amp;q=Les%20Rambles,%201%20Barcelona,%20Spain+(Mi%20nombre%20de%20egocios)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
//   >
//     <a href="https://www.gps.ie/car-satnav-gps/">Car GPS</a>
//   </iframe>
// </div>;
