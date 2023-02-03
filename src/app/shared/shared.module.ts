import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const imports: any[] = [
  HttpClientModule,
  MaterialModule,
  ReactiveFormsModule,
  FormsModule,
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...imports,
  ],
  exports: [
    ...imports
  ]
})
export class SharedModule { }
