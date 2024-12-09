export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
  description?: string;
}

export interface Bill {
  id: string;
  items: Array<{
    product: Product;
    quantity: number;
  }>;
  total: number;
  paymentMethod: 'cash' | 'online';
  customerName: string;
  date: Date;
}

export interface Vendor {
  id: string;
  name: string;
  contact: string;
  products: Product[];
}