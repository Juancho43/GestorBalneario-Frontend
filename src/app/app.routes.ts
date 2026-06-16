import {Routes} from '@angular/router';
import MapViewer from './views/map-viewer/map-viewer';
import {ReservationCreate} from './views/reservation-create/reservation-create';
import MainMenu from './views/main-menu/main-menu';
import {AboutMenu} from './views/about-menu/about-menu';
import ShadowEditor from './views/shadow-editor/shadow-editor';
import {ReservationViewer} from './views/reservation-viewer/reservation-viewer';
import {ClientViewer} from './views/client-viewer/client-viewer';
import {PaymentViewer} from './views/payment-viewer/payment-viewer';
import PaymentEditor from './views/payment-editor/payment-editor';
import {ServiceEditor} from './views/service-editor/service-editor';
import {currentSeasonGuard} from './core/utils/guards/current-season-guard';
import {SeasonsEditor} from './views/seasons-editor/seasons-editor';
import {InvoiceEditor} from './views/invoice-editor/invoice-editor';
import {InvoiceViewer} from './views/invoice-viewer/invoice-viewer';
import {ShadowViewer} from './views/shadow-viewer/shadow-viewer';
import {pendingChangesGuard} from './core/utils/guards/PendingChanges';

export const routes: Routes = [
  {
    title: 'Main Menu',
    path: 'home',
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
    loadComponent: ()=> MapViewer
  },

  {
    title: 'Editar mapa',
    canActivate: [currentSeasonGuard],
    path:'shadow-editor',
    loadComponent: ()=> ShadowEditor
  },
  {
    title:'Ver carpas',
    path:'shadow-view',
    loadComponent: ()=> ShadowViewer
  },
  {
    title:'Ver carpa',
    path:'shadow-view/:id',
    loadComponent: ()=> ShadowViewer
  },
  {
    title: 'Ver reservas',
    path: 'reservation-view',
    loadComponent:()=>ReservationViewer
  },
  {
    title: 'Ver reserva',
    path: 'reservation-view/:id',
    loadComponent:()=>ReservationViewer
  },
  {
    title: 'Crear reservas',
    canActivate: [currentSeasonGuard],
    canDeactivate: [pendingChangesGuard],
    path: 'reservation-create',
    loadComponent:()=> ReservationCreate
  },
  {
    title: 'Ver clientes',
    path: 'client-view',
    loadComponent: ()=> ClientViewer
  },
  {
    title: 'Ver cliente',
    path: 'client-view/:id',
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
    path: 'season-view',
    loadComponent: () => SeasonsEditor
  },
  {
    title: 'Configurar servicios',
    path: 'service-view',
    loadComponent: ()=> ServiceEditor
  },
  {
    title:'Ver facturas',
    path: 'invoice-view',
    loadComponent: () => InvoiceViewer
  },
  {
    title:'Ver factura',
    path: 'invoice-view/:id',
    loadComponent: () => InvoiceViewer
  },
  {
    title: 'Editar facturas',
    path:'invoice-editor/:id',
    canActivate: [currentSeasonGuard],
    loadComponent: ()=>InvoiceEditor
  },
  {
    path: '**',
    redirectTo: '/home',
  },
];
