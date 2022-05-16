import { Component, OnInit, ViewChild } from '@angular/core';
import { productsDB } from 'src/app/data/products';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Product } from 'src/model/product';

@Component({
  selector: 'productList-component',
  templateUrl: 'productList.component.html',
  styleUrls: ['productList.component.css'],
})
export class ProductList implements OnInit {
  displayedColumns: string[] = [
    'position',
    'name',
    'weight',
    'symbol',
    'active',
    'actions',
  ];
  dataSource = new MatTableDataSource<Product>(productsDB.Product);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor() {}
  view = 'list';
  products!: {
    idProduct: number;
    id_supplier: number;
    id_subcategory: number;
    quantity: number;
    description: string;
    reference: string;
    active: boolean;
    date_added: string;
    img_url: string;
    name: string;
    price: number;
    stock: number;
    id_category: number;
  }[];

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.products = productsDB.Product;

    console.log(this.dataSource);
    console.log(this.products);
  }
}
