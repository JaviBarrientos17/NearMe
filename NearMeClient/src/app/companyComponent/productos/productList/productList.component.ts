import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Product } from 'src/model/product';
import { ProductsService } from 'src/app/services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/users.service';
import { User } from 'src/model/user.model';

@Component({
  selector: 'productList-component',
  templateUrl: 'productList.component.html',
  styleUrls: ['productList.component.css'],
  providers: [ProductsService],
})
export class ProductList implements OnInit {
  displayedColumns: string[] = [
    'idProduct',
    'name',
    'price',
    'idCategory',
    'dateAdded',
    'actions',
  ];

  products: Array<Product> = [];
  dataSource: any;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  user: User;
  userid: number = parseInt(this.authService.currentUserIdValue);
  constructor(
    private userService: UserService,
    private authService: AuthenticationService,
    private _productsService: ProductsService,
    private _activeRoute: ActivatedRoute,
    private _router: Router,
    public dialog: MatDialog
  ) { }
  view = 'list';

  ngOnInit(): void {
    this.user = this.authService.currentUserValue;
    console.log("here333");
    console.log(this.userid);
    this.getAllProductsById(this.userid);


  }
  deleteProduct(idProduct: Number) {
    const product = this.products.find((x) => x.idProduct === idProduct);
    if (!product) return;
    product.isDeleting = true;
    this._productsService
      .deleteProduct(idProduct)
      .pipe(first())
      .subscribe(
        () =>
        (this.products = this.products.filter(
          (x) => x.idProduct !== idProduct
        ))
      );
    this.getAllProductsById(this.userid);
  }
  getAllProductsById(id) {
    this._productsService.getAllProductsByIdUser(id).subscribe(
      (resul) => {
        console.log('OK');
        this.products = JSON.parse(JSON.stringify(resul));
        this.dataSource = new MatTableDataSource<Product>(this.products);
        this.dataSource.paginator = this.paginator;
        console.log(this.products);
        console.log(this.products.length);
      },
      (error) => {
        console.log('ERROR');
        console.log(error);
      }
    );
    console.log(this.products);
  }
}
