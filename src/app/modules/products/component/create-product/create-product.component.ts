import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { debounceTime, distinctUntilChanged, Observable } from 'rxjs';
import { Product } from '../../interfaces/Product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent implements OnInit {
  title = 'Crear producto';
  form: FormGroup;
  isUpdate = false;
  private id: number = 0;
  constructor(
    public dialogRef: MatDialogRef<CreateProductComponent>,
    private fb: FormBuilder,
    private productService: ProductService,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) {
    console.log(data);
    this.isUpdate = this.data?.id ? true : false;
    this.id = this.data?.id;
    if (this.isUpdate) {
      this.title = 'Actualizar producto';
    }

    this.form = this.fb.group({
      id: [this.data?.id],
      name: [this.data?.name, [Validators.required]],
      reference: [this.data?.reference, [Validators.required]],
      category: [this.data?.category, [Validators.required]],
      price: [this.data?.price, [Validators.required, Validators.min(0)]],
      weight: [this.data?.weight, [Validators.required, Validators.min(0)]],
      stock: [this.data?.stock, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.form.controls['reference'].valueChanges
      .pipe(debounceTime(800), distinctUntilChanged())
      .subscribe({
        next: (reference) => {
          this.productService.getOneByReference(reference).subscribe({
            next: () => {
              this.form.controls['reference'].setErrors({
                exist: true,
              });
            },
            error: () => {
              this.form.controls['reference'].setErrors(null);
            },
          });
        },
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveDocument() {
    let methodService: Observable<Product> = this.productService.createDocument(
      this.form.value
    );

    if (this.isUpdate) {
      methodService = this.productService.updateDocument(
        this.id,
        this.form.value
      );
    }

    methodService.subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
    });
  }
}
