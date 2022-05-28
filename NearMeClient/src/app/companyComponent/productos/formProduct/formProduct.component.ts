import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/model/product';
import { User } from 'src/model/user.model';

@Component({
  selector: 'formProduct-component',
  templateUrl: 'formProduct.component.html',
  styleUrls: ['formProduct.component.css'],
  providers: [ProductsService],
})
export class FormProductComponent implements OnInit {
  productForm!: FormGroup;
  submitted = false;
  idProduct!: Number;
  user: User;
  idSupplier: string;
  dateAdded: String;
  product: Product;
  isAddMode!: boolean;

  constructor(
    private formBuilder: FormBuilder,
    protected router: Router,
    protected route: ActivatedRoute,
    protected _productService: ProductsService,
    protected authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.idProduct = this.route.snapshot.params['idProduct'];
    this.user = this.authService.currentUserValue;
    this.idSupplier = this.user.id;
    this.isAddMode = !this.idProduct;
    console.log(this.idProduct);
    console.log(this.isAddMode);
    console.log(this.idSupplier);

    this.productForm = this.formBuilder.group({
      reference: ['', Validators.required],
      name: ['', Validators.required],
      price: ['', Validators.required],
      imgUrl: [''],
      description: ['', Validators.required],
      category: ['', Validators.required],
      subCategory: ['', Validators.required],
      active: ['', Validators.required],
      stock: ['', Validators.required],
    });

    //PARA EDITAR EL PRODUCTO
    if (!this.isAddMode) {
      console.log('EDITAR');
      this._productService
        .getProductsById(this.idProduct)
        .pipe(first())
        .subscribe((x) => this.productForm.patchValue(x));
    }
    // convenience getter for easy access to form fields
  }
  get f() {
    return this.productForm.controls;
  }

  onSubmit() {
    console.log('SUBMIT');
    this.submitted = true;
    // stop here if form is invalid
    if (this.productForm.invalid) {
      console.log('INVALID');
      return;
    }
    if (this.isAddMode) {
      console.log('ADD');
      this.addProduct();
    } else {
      console.log('UPDATE');
      this.updateProduct();
    }
  }

  private addProduct() {
    console.log(this.productForm.value);
    this._productService.addProductByForm(this.productForm.value).subscribe(
      (resul) => {
        console.log('User inserted data: ' + resul);
      },
      (error) => {
        console.log('Error: ' + error);
      }
    );
  }

  private updateProduct() {
    console.log(this.productForm.value);
    this._productService
      .updateProduct(this.productForm.value)
      .pipe(first())
      .subscribe(() => {
        console.log('UPDATED');
      })
      .add();
  }
}
