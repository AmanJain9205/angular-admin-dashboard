import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/components/dashboard/dashboard.component')
        .then(m => m.DashboardComponent)
  },
  {
    path: 'users',
    loadComponent: () =>
      import('./features/users/components/users/users.component')
        .then(m => m.UsersComponent)
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./features/products/components/products/products.component')
        .then(m => m.ProductsComponent)
  },
  {
    path: 'analytics',
    loadComponent: () =>
      import('./features/analytics/components/analytics/analytics.component')
        .then(m => m.AnalyticsComponent)
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./features/settings/components/settings/settings.component')
        .then(m => m.SettingsComponent)
  },
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

