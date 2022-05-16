import { Component, OnInit } from '@angular/core';

declare var expand: any;
declare var collapse: any;
declare var toggle: any;
@Component({
  selector: 'sidenavCompany-component',
  templateUrl: 'sidenavCompany.component.html',
  styleUrls: ['sidenavCompany.component.scss'],
})
export class SidenavComany implements OnInit {
  constructor() {}

  ngOnInit() {
    expand();
    collapse();
    toggle();
  }
}