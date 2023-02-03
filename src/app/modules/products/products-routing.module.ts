import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProductComponent } from './component/create-product/create-product.component';
import { ListProductComponent } from './component/list-product/list-product.component';

const routes: Routes = [
  {
    path:'',
    component: ListProductComponent
  },
  {
    path:'create',
    component: CreateProductComponent
  },
  {
    path:'show/:id',
    component: CreateProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
