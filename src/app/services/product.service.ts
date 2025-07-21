import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProductDetail } from '../features/products/interfaces/products.interface';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private productsSubject = new BehaviorSubject<IProductDetail[]>([
    { id: 1, name: 'Laptop Pro', category: 'Tech', stock: 4, price: 1500 },
    { id: 2, name: 'Smartphone X', category: 'Tech', stock: 10, price: 999 },
    { id: 3, name: 'Office Chair', category: 'Furniture', stock: 15, price: 120 },
    { id: 4, name: 'Desk Lamp', category: 'Furniture', stock: 25, price: 35 },
    { id: 5, name: 'Bluetooth Speaker', category: 'Audio', stock: 8, price: 75 },
    { id: 6, name: 'Coffee Maker', category: 'Appliances', stock: 12, price: 60 },
    { id: 7, name: 'Backpack', category: 'Accessories', stock: 20, price: 45 },
    { id: 8, name: 'Monitor 27"', category: 'Tech', stock: 6, price: 300 },
    { id: 9, name: 'Wireless Mouse', category: 'Tech', stock: 18, price: 25 },
    { id: 10, name: 'Notebook', category: 'Stationery', stock: 50, price: 5 }
  ]);
  products$ = this.productsSubject.asObservable();

  public addProduct(product: Omit<IProductDetail, 'id'>) {
    const products = this.productsSubject.value;
    const newProduct = { ...product, id: this.generateId(products) };
    this.productsSubject.next([...products, newProduct]);
  }

  public editProduct(updatedProduct: IProductDetail) {
    const products = this.productsSubject.value.map(product =>
      product.id === updatedProduct.id ? { ...updatedProduct } : product
    );
    this.productsSubject.next(products);
  }

  private generateId(products: IProductDetail[]): number {
    return products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
  }
}
