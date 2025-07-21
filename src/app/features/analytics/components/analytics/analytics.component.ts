import { Component, AfterViewInit, ViewChild, ElementRef, Inject, PLATFORM_ID, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';
import { isPlatformBrowser } from '@angular/common';
import { ProductService } from '../../../../services/product.service';
import { UserService } from '../../../../services/user.service';
import { IProductDetail } from '../../../products/interfaces/products.interface';
import { IUserDetail } from '../../../users/interfaces/user.interface';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss'],
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnalyticsComponent implements AfterViewInit {
  @ViewChild('signupsChart') public signupsChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('revenueChart') public revenueChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('rolesChart') public rolesChartRef!: ElementRef<HTMLCanvasElement>;

  private platformId = inject(PLATFORM_ID);
  private productService = inject(ProductService);
  private userService = inject(UserService);


  public ngAfterViewInit() {
  if (isPlatformBrowser(this.platformId)) {
    Promise.resolve().then(() => this.initCharts());
  }
  }

  private initCharts() {
    this.initSignupsChart();

    this.productService.products$.subscribe(products => {
      this.initRevenueChart(products);
    });

    this.userService.users$.subscribe(users => {
      this.initRolesChart(users);
    });
  }

  private initSignupsChart() {
    new Chart(this.signupsChartRef.nativeElement, {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Signups',
          data: [12, 19, 7, 14, 20, 16, 22],
          borderColor: '#0d6efd',
          backgroundColor: 'rgba(13,110,253,0.1)',
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }

  private initRevenueChart(products: IProductDetail[]) {
    const categoryRevenue: { [key: string]: number } = {};

    for (const product of products) {
      categoryRevenue[product.category] = (categoryRevenue[product.category] || 0) + product.price;
    }

    const labels = Object.keys(categoryRevenue);
    const data = Object.values(categoryRevenue);

    new Chart(this.revenueChartRef.nativeElement, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Revenue (₹)',
          data,
          backgroundColor: ['#0d6efd', '#6c757d', '#198754', '#ffc107', '#dc3545', '#0dcaf0']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }

  private initRolesChart(users: IUserDetail[]) {
    const roleCount: { [key: string]: number } = {};

    for (const user of users) {
      roleCount[user.role] = (roleCount[user.role] || 0) + 1;
    }

    const labels = Object.keys(roleCount);
    const data = Object.values(roleCount);

    new Chart(this.rolesChartRef.nativeElement, {
      type: 'pie',
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: ['#0d6efd', '#198754', '#ffc107', '#dc3545']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }

}
