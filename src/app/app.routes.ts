import { Routes } from '@angular/router';
import ShadowViewer from './views/shadow-viewer/shadow-viewer';
import {ReservationCreate} from './views/reservation-create/reservation-create';
import MainMenu from './components/layout/main-menu/main-menu';
import {AboutMenu} from './components/layout/about-menu/about-menu';
import ShadowEditor from './views/shadow-editor/shadow-editor';
import {ReservationViewer} from './views/reservation-viewer/reservation-viewer';
import {ClientViewer} from './views/client-viewer/client-viewer';
import {PaymentViewer} from './views/payment-viewer/payment-viewer';
import PaymentEditor from './views/payment-editor/payment-editor';
import {ServiceEditor} from './views/service-editor/service-editor';
import {currentSeasonGuard} from './core/utils/current-season-guard';
import {SeasonsEditor} from './views/seasons-editor/seasons-editor';
import {InvoiceEditor} from './views/invoice-editor/invoice-editor';
import {InvoiceViewer} from './views/invoice-viewer/invoice-viewer';

export const routes: Routes = [
  {
    title: 'Main Menu',
    path: '',
    loadComponent: () => MainMenu
  },
  {
    title: 'About',
    path: 'about',
    loadComponent:  () => AboutMenu
  },
  {
    title: 'Mapa de sombras',
    path: 'map',
    loadComponent: ()=> ShadowViewer
  },
  {
    title: 'Editar mapa',
    canActivate: [currentSeasonGuard],
    path:'shadow-editor',
    loadComponent: ()=> ShadowEditor
  },
  {
    title: 'Ver reservas',
    path: 'reservation-view',
    loadComponent:()=>ReservationViewer
  },
  {
    title: 'Crear reservas',
    canActivate: [currentSeasonGuard],
    path: 'reservation-create',
    loadComponent:()=> ReservationCreate
  },
  {
    title: 'Ver clientes',
    path: 'client-view',
    loadComponent: ()=> ClientViewer
  },
  {
    title: 'Crear pago',
    canActivate: [currentSeasonGuard],
    path: 'payment-create',
    loadComponent: ()=> PaymentEditor
  },
  {
    title: 'Reportes de pagos',
    path: 'payment-view',
    loadComponent: () => PaymentViewer
  },
  {
    title: 'Configurar temporadas',
    canActivate: [currentSeasonGuard],
    path: 'season-manager',
    loadComponent: () => SeasonsEditor
  },
  {
    title: 'Configurar servicios',
    canActivate: [currentSeasonGuard],
    path: 'service-manager',
    loadComponent: ()=> ServiceEditor
  },
  {
    title:'Ver facturas',
    path: 'invoice-viewer',
    loadComponent: () => InvoiceViewer
  },
  {
    title: 'Editar facturas',
    path:'invoice-editor',
    canActivate: [currentSeasonGuard],
    loadComponent: ()=>InvoiceEditor
  }

];
