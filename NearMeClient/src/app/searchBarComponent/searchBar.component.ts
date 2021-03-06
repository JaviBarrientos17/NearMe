import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Product } from 'src/model/product';
import { User } from 'src/model/user.model';
import { AuthenticationService } from '../services/authentication.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'searchBar',
  templateUrl: './searchBar.component.html',
  styleUrls: ['./searchBar.component.css'],
})
export class SearchBar implements OnInit {
  @Output() sender = new EventEmitter();
  products: Array<Product> = [];
  user: User;
  search: String = '';
  
  searchString: String;

  constructor(
    private _productsService: ProductsService,
    private authService: AuthenticationService,
  ) { }
  ngOnInit(): void {
    this.user = this.authService.currentUserValue;
    console.log(this.user);
  }


  syncSearch() {



    if (this.search.length > 1) {

      this.searchString = this.search;

      this._productsService.searchProduct(this.searchString).subscribe(
        (resul) => {
          this.products = JSON.parse(JSON.stringify(resul));
          console.log('Products by Search');
          console.log(resul);
          this.sender.emit(resul);
        },
        (error) => {
          console.log('Products by category error');
          console.log(error);
        });
      //clean search

    }


  }

}
