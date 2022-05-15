import { Component, OnInit, ViewChild } from '@angular/core';
import { pedidosDB } from 'src/app/data/pedidos';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Pedido } from 'src/model/pedido';

@Component({
  selector: 'pedidosList-component',
  templateUrl: 'pedidosList.component.html',
  styleUrls: ['pedidosList.component.css'],
})
export class PedidosList implements OnInit {
  displayedColumns: string[] = [
    'id_pedido',
    'name',
    'price',
    'date_added',
    'state',
    'actions',
  ];
  dataSource = new MatTableDataSource<Pedido>(pedidosDB.Pedido);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor() {}
  view = 'list';
  pedidos!: {
    id_pedido: number;
    id_supplier: number;
    id_subcategory: number;
    quantity: number;
    reference: string;
    date_added: string;
    img_url: string;
    name: string;
    price: number;
    id_category: number;
  }[];

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.pedidos = pedidosDB.Pedido;

    console.log(this.dataSource);
    console.log(this.pedidos);
  }
}
