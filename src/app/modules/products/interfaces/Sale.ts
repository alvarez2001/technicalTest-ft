
export interface Sale {
  id:          number;
  product_id:  number;
  quantity:    number;
  unit_price:  number;
  total_price: number;
  deleted_at:  null;
  created_at:  Date;
  updated_at:  Date;
}
