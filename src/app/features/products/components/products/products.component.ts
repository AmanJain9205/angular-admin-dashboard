import { ChangeDetectionStrategy, Component, inject, OnInit, TemplateRef } from '@angular/core';
import { ProductService } from '../../../../services/product.service';
import { IProductDetail } from '../../interfaces/products.interface';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  imports: [CurrencyPipe, CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent implements OnInit {
  public products: IProductDetail[] = [];
  public selectedProduct: any = {};
  public page = 1;
  public pageSize = 5;
  public currentPage = 1;
  public totalPages = 1;
  public pagedProducts: IProductDetail[] = [];
  public newProduct: Omit<IProductDetail, 'id'> = { name: '', category: '', stock: 0, price: 0 };

  private productService = inject(ProductService);
  private modalService = inject(NgbModal);

  public ngOnInit() {
  this.productService.products$.subscribe(products => {
    this.products = products;
    this.updatePagination();
  });
  }

  public isLowStock(stock: number): boolean {
    return stock < 5;
  }

  openAddModal(content: TemplateRef<any>) {
  this.newProduct = { name: '', category: '', stock: 0, price: 0 };
  this.modalService.open(content, { centered: true });
 }

  public saveEdit() {
    this.productService.editProduct(this.selectedProduct);
  }

  public updatePagination() {
  this.totalPages = Math.ceil(this.products.length / this.pageSize) || 1;
  const start = (this.currentPage - 1) * this.pageSize;
  const end = start + this.pageSize;
  this.pagedProducts = this.products.slice(start, end);
  }

  public addProduct(form: any, modal: any) {
  if (form.invalid || !this.newProduct.name || !this.newProduct.category || this.newProduct.stock == null || this.newProduct.price == null) {
    return;
  }
  this.productService.addProduct(this.newProduct);
  modal.close();
  }

 public goToPage(page: number) {
  if (page < 1 || page > this.totalPages) return;
  this.currentPage = page;
  this.updatePagination();
  }

 public openEditModal(product: IProductDetail, modalRef: TemplateRef<any>) {
  this.selectedProduct = { ...product }; // clone so original isn't mutated until save
  this.modalService.open(modalRef, { centered: true });
 }
}
