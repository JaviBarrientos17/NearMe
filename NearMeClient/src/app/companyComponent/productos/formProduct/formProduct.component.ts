import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'formProduct-component',
  templateUrl: 'formProduct.component.html',
  styleUrls: ['formProduct.component.css'],
  providers: [ProductsService],
})
export class FormProductComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    protected router: Router,
    protected route: ActivatedRoute,
    protected _productService: ProductsService
  ) {}

  productForm!: FormGroup;
  submitted = false;
  idProduct!: Number;
  isAddMode!: boolean;

  workerId: number | undefined;
  ngOnInit() {
    this.idProduct = this.route.snapshot.params['idProduct'];
    console.log(this.idProduct);
    //PARA CREAR EL PRODUCTO
    console.log(this.isAddMode);
    this.isAddMode = !this.idProduct;
    this.productForm = this.formBuilder.group({
      productReference: [''],
      productName: [''],
      productPrice: [''],
      productDescription: [''],
      productCategory: [''],
      // productImage: ['',Validators.nullValidator],
      productActive: [''],
      productStock: [''],
    });

    //PARA EDITAR EL PRODUCTO
    if (!this.isAddMode) {
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
        //this.alertService.success('User added', { keepAfterRouteChange: true });
        console.log('ADDED');
        this.router.navigate(['../'], { relativeTo: this.route });
      })
      .add();
  }

  private updateProduct() {
    this._productService
      .updateProduct(this.idProduct, this.productForm.value)
      .pipe(first())
      .subscribe(() => {
        // this.alertService.success('User updated', {
        //   keepAfterRouteChange: true,
        // });
        console.log('UPDATED');
        this.router.navigate(['../../'], { relativeTo: this.route });
      })
      .add();
  }
}
