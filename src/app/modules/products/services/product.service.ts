import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Base } from 'src/app/shared/services/base';
import { Product } from '../interfaces/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends Base<Product> {
  constructor(
    httpClient: HttpClient
  ) {
    super('products', httpClient);
  }

  getOneByReference(reference: string): Observable<Product> {
    return this.httpClient.get<Product>(`${this.baseUrl}/by-reference/${reference}`)
  }

}
