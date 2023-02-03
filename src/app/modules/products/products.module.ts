import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ListProductComponent } from './component/list-product/list-product.component';
import { CreateProductComponent } from './component/create-product/create-product.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViewProductComponent } from './component/view-product/view-product.component';
import { RegisterSaleComponent } from './component/register-sale/register-sale.component';


@NgModule({
  declarations: [
    ListProductComponent,
    CreateProductComponent,
    ViewProductComponent,
    RegisterSaleComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule
  ]
})
export class ProductsModule { }
