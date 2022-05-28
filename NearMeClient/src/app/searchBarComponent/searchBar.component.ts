import { Component } from '@angular/core';
import { Product } from 'src/model/product';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'searchBar',
  templateUrl: './searchBar.component.html',
  styleUrls: ['./searchBar.component.css'],
})
export class SearchBar {
  products: Array<Product> = [];

  search: String = '';

  constructor(
    private _productsService: ProductsService,
  ) { }


  syncSearch(UpdatedValue: string) {
    this.search = UpdatedValue;
    console.log(this.search);

    if (this.search.length > 3) {
      this._productsService.searchProduct(this.search).subscribe(
        (resul) => {

          this.products = JSON.parse(JSON.stringify(resul));
          console.log('Products by Search');
          console.log(resul);
        },
        (error) => {
          console.log('Products by category error');
          console.log(error);
        });
    }
  }

}
