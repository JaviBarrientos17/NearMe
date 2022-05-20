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
    idSupplier: number;
    idSubcategory: number;
    description: string;
    reference: string;
    active: boolean;
    dateAdded: string;
    imgUrl: string;
    name: string;
    price: number;
    stock: number;
    idCategory: number;
  }[];

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.products = productsDB.Product;

    console.log(this.dataSource);
    console.log(this.products);
  }
}
