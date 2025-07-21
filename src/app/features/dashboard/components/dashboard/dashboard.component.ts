import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../../../services/product.service';
import { UserService } from '../../../../services/user.service';
import { CommonModule, NgFor } from '@angular/common';
import { SummaryCardComponent } from '../../../../shared/summary-card/summary-card.component';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, NgFor, SummaryCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  public userCount = 0;
  public productCount = 0;
  public revenue = 0;
  public activityFeed: string[] = [];

  private userService = inject(UserService);
  private productService = inject(ProductService);

  public ngOnInit() {
    this.userService.users$.subscribe(users => this.userCount = users.length);
    this.productService.products$.subscribe(products => {
      this.productCount = products.length;
      this.revenue = products.reduce((acc, p) => acc + p.price * p.stock, 0);
    });
    this.activityFeed = [
      'User John signed up.',
      'Product "Laptop Pro" added.',
      'User Anna updated her profile.'
    ];
  }
}
