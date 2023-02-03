import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Base } from 'src/app/shared/services/base';
import { Sale } from '../interfaces/Sale';

@Injectable({
  providedIn: 'root'
})
export class SaleService extends Base<Sale> {
  constructor(
    httpClient: HttpClient
  ) {
    super('sales', httpClient);
  }

}
