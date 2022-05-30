import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/model/category';
import { Product } from 'src/model/product';
import { CategoriesService } from '../services/categories.service';
import { ProductsService } from '../services/products.service';
import { AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'productos-component',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
  providers: [ProductsService, CategoriesService],
})
export class ProductosComponent implements OnInit {
  products: Array<Product> = [];
  objectKeys = Object.keys;
  idCategory: Number = 0;
  parent: Number = 0;
  subcategories: Array<Category> = [];
  @ViewChild('productscontainer') productscontainer: ElementRef;
  productName: String = '';
  constructor(
    private _productsService: ProductsService,
    private _activeRoute: ActivatedRoute,
    private _categoryService: CategoriesService,
    private _router: Router,
    public elementRef: ElementRef,
    private renderer: Renderer2
  ) {}
  title = 'Productos';

  ngOnInit(): void {
    this._activeRoute.paramMap.subscribe((params) => {
      this.idCategory = Number.parseInt(params.get('idCategory') + '');
      this.parent = Number.parseInt(params.get('parent') + '');
      console.log(this.idCategory);

      if (this.idCategory) {
        console.log('productsByCategory');
        this._productsService
          .getProductsByCategory(this.idCategory, this.parent)
          .subscribe(
            (resul) => {
              //this.products = JSON.parse(resul);
              this.products = JSON.parse(JSON.stringify(resul));
              console.log('Products by category');
              console.log(resul);
            },
            (error) => {
              console.log('Products by category error');
              console.log(error);
            }
          );
        // this._categoryService.getSubCategoryList().subscribe(
        //   (resul) => {
        //     this.subcategories = JSON.parse(resul);
        //     console.log('Subcategory list');
        //     console.log(resul);
        //   },
        //   (error) => {
        //     console.log('Subcategory list error');
        //     console.log(error);
        //   }
        // );
      } else {
        this._productsService.getAllProducts().subscribe(
          (resul) => {
            this.products = JSON.parse(resul);
            console.log('All products');
            console.log(resul);
          },
          (error) => {
            console.log('All products error');

            console.log(error);
          }
        );
      }
    });
  }
  issetCategory() {
    return this._router.url == '/productos' ? false : true;
  }

  receiver(receivedFromChild: any) {
    if (receivedFromChild.length > 0) {
      this.products = receivedFromChild;
    } else {
      this._productsService.getAllProducts().subscribe(
        (resul) => {
          this.products = JSON.parse(resul);
          console.log('All products');
          console.log(resul);
        },
        (error) => {
          console.log('All products error');

          console.log(error);
        }
      );
    }
  }
}
