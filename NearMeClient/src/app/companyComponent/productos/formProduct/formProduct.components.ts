import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'formProduct-component',
  templateUrl: 'formProduct.component.html',
  styleUrls: ['formProduct.component.css'],
})
export class FormProductComponent implements OnInit {
  constructor(protected router: Router, protected route: ActivatedRoute) {}

  productForm!: FormGroup;

  private initForm() {
    this.productForm = new FormGroup({
      productReference: new FormControl(''),
      productName: new FormControl(''),
      productPrice: new FormControl([
        Validators.required,
        Validators.minLength(100),
      ]),
      productDescription: new FormControl(''),
      productCategory: new FormControl(''),
      productImage: new FormControl(''),
      productActive: new FormControl(''),
      productStock: new FormControl(''),
    });
  }

  workerId: number | undefined;
  ngOnInit() {
    this.initForm();
  }
  onSubmit() {}
}
