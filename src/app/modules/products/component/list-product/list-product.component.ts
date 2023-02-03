import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Product } from '../../interfaces/Product';
import { ProductService } from '../../services/product.service';
import { CreateProductComponent } from '../create-product/create-product.component';
import { ViewProductComponent } from '../view-product/view-product.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss'],
})
export class ListProductComponent implements OnInit {
  products: Product[] = [];
  displayedColumns: string[] = [
    'reference',
    'name',
    'category',
    'price',
    'stock',
    'options',
  ];

  constructor(
    private productService: ProductService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.productService.getAll().subscribe({
      next: (products) => {
        this.products = products;
      },
    });
  }

  openDialog(data?: Product): void {
    const dialogRef = this.dialog.open(CreateProductComponent, {
      width: '400px',
      disableClose: true,
      data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getData();
      }
    });
  }

  viewDocument(data: Product): void {
    const dialogRef = this.dialog.open(ViewProductComponent, {
      width: '600px',
      disableClose: true,
      data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getData();
    });
  }

  deleteDocument(product: Product) {
    this.productService.deleteDocument(product.id).subscribe({
      next: () => {
        this.getData();
      },
    });
  }
}
