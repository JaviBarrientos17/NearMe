import { Component } from '@angular/core';
import { cartService } from './services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [cartService],
})
export class AppComponent {
  title = 'NearMe';
  constructor(public router: Router) {}
}
