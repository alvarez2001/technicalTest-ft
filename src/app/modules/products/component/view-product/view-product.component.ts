import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '../../interfaces/Product';
import { Sale } from '../../interfaces/Sale';
import { ProductService } from '../../services/product.service';
import { RegisterSaleComponent } from '../register-sale/register-sale.component';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss'],
})
export class ViewProductComponent implements OnInit {
  displayedColumns: string[] = ['quantity', 'unit_price', 'total_price'];
  sales: Sale[] = [];
  title = 'Ver producto';
  product?: Product;
  constructor(
    public dialogRef: MatDialogRef<ViewProductComponent>,
    private dialog: MatDialog,
    private productService: ProductService,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.productService.getOne(this.data.id).subscribe({
      next: (data) => {
        this.product = data;
        this.sales = data.sales.filter((sale) => {
          return sale?.deleted_at ? false : true;
        });
      },
    });
  }

  registerSale(): void {
    const dialogRef = this.dialog.open(RegisterSaleComponent, {
      width: '400px',
      disableClose: true,
      data: this.product,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        this.getData();
      }
    });
  }
}
