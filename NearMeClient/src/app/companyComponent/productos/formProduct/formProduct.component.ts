import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProductsService } from 'src/app/services/products.service';
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
  idSupplier: Observable<string>;
  dateAdded: String;
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
    this.idSupplier = this.authService.currentUserId;
    this.isAddMode = !this.idProduct;
    console.log(this.idProduct);
    console.log(this.isAddMode);

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

    this.productForm.patchValue({
      idProduct: this.idProduct,
      idSupplier: this.idSupplier,
      dateAdded: '',
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
    this._productService
      .addProductByForm(this.productForm.value)
      .pipe(first())
      .subscribe(() => {
        console.log('ADDED');
      })
      .add();
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
