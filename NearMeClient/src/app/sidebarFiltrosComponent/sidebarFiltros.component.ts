import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/model/category';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'sidebarFiltros-component',
  templateUrl: './sidebarFiltros.component.html',
  styleUrls: ['./sidebarFiltros.component.css'],
  providers: [CategoriesService],
})
export class SidebarFiltrosComponent implements OnInit {
  subcategories:Array<Category> = [];
  idCategory: Number = 0;
  parent: Number = 0;

  constructor(private _categoriesService: CategoriesService, private _activeRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.callCategories();
  }

  callCategories() {
    this._activeRoute.paramMap.subscribe((params) => {
      this.idCategory = Number.parseInt(params.get('idCategory') + '');
      console.log(this.idCategory);

      if (this.idCategory) {
        console.log(this.idCategory);
        this._categoriesService.getSubCategoryList().subscribe(
          (resul) => {
            this.subcategories = JSON.parse(JSON.stringify(resul));
            console.log('Subcategory list');
            console.log(resul);
          },
          (error) => {
            console.log('Subcategory list error');
            console.log(error);
          }
        );
      }
    });
  }
}