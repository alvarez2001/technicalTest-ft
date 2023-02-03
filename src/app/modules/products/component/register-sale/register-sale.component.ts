import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Product } from '../../interfaces/Product';
import { SaleService } from '../../services/sale.service';

@Component({
  selector: 'app-register-sale',
  templateUrl: './register-sale.component.html',
  styleUrls: ['./register-sale.component.scss'],
})
export class RegisterSaleComponent implements OnInit {
  form: FormGroup;
  title = 'Registrar venta';
  totalPrice = 0;

  constructor(
    public dialogRef: MatDialogRef<RegisterSaleComponent>,
    private saleService: SaleService,
    @Inject(MAT_DIALOG_DATA) public data: Product,
    private fb: FormBuilder
  ) {
    this.totalPrice = data.price;
    this.form = this.fb.group({
      quantity: [1, [Validators.required, Validators.min(1), Validators.max(data.stock)]],
      product_id: [this.data.id, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.form.controls['quantity'].valueChanges.subscribe({
      next: (quantity) => {
        this.totalPrice = quantity * this.data.price
      }
    })
  }

  saveDocument() {
    this.saleService.createDocument(this.form.value).subscribe({
      next:(sale) => {
        this.dialogRef.close(true)
      }
    })
  }

}
