import { Routes } from '@angular/router';

export const externalRoutes: Routes = [
  { 
    path: '', 
    redirectTo: 'establishments-list', 
    pathMatch: 'full' 
  },
  { 
    path: 'establishments-list', 
    loadComponent: () => import('./establishments-list/establishments-list.component').then(c => c.EstablishmentsListComponent)
  }
];