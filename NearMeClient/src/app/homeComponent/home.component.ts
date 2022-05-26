import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/model/category';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-root',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  providers: [CategoriesService],
})
export class HomeComponent implements OnInit {
  title = 'Home';
  mobileQuery: MediaQueryList;
  categories: Array<Category> = [];

  private _mobileQueryListener: () => void;

  constructor(private _categoriesService: CategoriesService) {}
  ngOnInit(): void {
    this._categoriesService.getAllCategories().subscribe(
      (resul) => {
        this.categories = JSON.parse(resul);
        console.log('All Categories');
        console.log(resul);
      },
      (error) => {
        console.log('All Categories error');
        console.log(error);
      }
    );
  }
}
