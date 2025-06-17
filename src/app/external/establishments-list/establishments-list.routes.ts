import { Routes } from '@angular/router';

export const establishmentsListRoutes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./establishments-list.component').then(c => c.EstablishmentsListComponent)
  }
];