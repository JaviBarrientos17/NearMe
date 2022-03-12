import { Component } from '@angular/core';

@Component({
  selector: 'searchBar',
  templateUrl: './searchBar.component.html',
  styleUrls: ['./searchBar.component.css'],
})
export class SearchBar {
  search: String = '';
}
