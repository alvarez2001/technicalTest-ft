import { Sale } from "./Sale";

export interface Product {
  id:         number;
  name:       string;
  reference:  string;
  category:   string;
  price:      number;
  weight:     number;
  stock:      number;
  deleted_at?: Date;
  created_at?: Date;
  updated_at?: Date;
  sales:      Sale[];
}

