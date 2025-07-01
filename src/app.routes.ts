import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { Documentation } from './app/pages/documentation/documentation';
import { Landing } from './app/pages/landing/landing';
import { Notfound } from './app/pages/notfound/notfound';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/establecimientos',
    pathMatch: 'full'
  },
  {
    path: 'establecimientos',
    loadComponent: () => import('../src/app/components/establecimientos/establecimientos.component')
      .then(m => m.EstablecimientosComponent),
    title: 'Listado de Establecimientos'
  },
  {
    path: 'proceso-acreditacion',
    loadComponent: () => import('../src/app/components/proceso-acreditacion/proceso-acreditacion.component')
      .then(m => m.ProcesoAcreditacionComponent),
    title: 'Proceso de Acreditación'
  },
  {
    path: '**',
    redirectTo: '/establecimientos'
  }
];
