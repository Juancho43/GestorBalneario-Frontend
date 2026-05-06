import { Routes } from '@angular/router';
import ShadowViewer from './components/views/shadow-viewer/shadow-viewer';
import {ReservationCreate} from './components/views/reservation-create/reservation-create';
import MainMenu from './components/layout/main-menu/main-menu';
import {AboutMenu} from './components/layout/about-menu/about-menu';
import ShadowEditor from './components/views/shadow-editor/shadow-editor';
import {ReservationViewer} from './components/views/reservation-viewer/reservation-viewer';
import {ClientViewer} from './components/views/client-viewer/client-viewer';
import {PaymentViewer} from './components/views/payment-viewer/payment-viewer';
import PaymentEditor from './components/payments/payment-editor/payment-editor';
import SeasonSwitch from './components/views/season-switch/season-switch';
import {ServiceEditor} from './components/views/service-editor/service-editor';
import {currentSeasonGuard} from './core/utils/current-season-guard';
import {SeasonsEditor} from './components/seasons/seasons-editor/seasons-editor';

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
    title: 'Shadow map',
    path: 'shadow-view',
    loadComponent: ()=> ShadowViewer
  },
  {
    title: 'Edit map',
    canActivate: [currentSeasonGuard],
    path:'shadow-editor',
    loadComponent: ()=> ShadowEditor
  },
  {
    title: 'View Reservations',
    path: 'reservation-view',
    loadComponent:()=>ReservationViewer
  },
  {
    title: 'Create Reservation',
    canActivate: [currentSeasonGuard],
    path: 'reservation-create',
    loadComponent:()=> ReservationCreate
  },
  {
    title: 'View Client',
    path: 'client-view',
    loadComponent: ()=> ClientViewer
  },
  {
    title: 'Manage payments',
    canActivate: [currentSeasonGuard],
    path: 'payment-create',
    loadComponent: ()=> PaymentEditor
  },
  {
    title: 'Payments reports',
    path: 'payment-view',
    loadComponent: () => PaymentViewer
  },
  {
    title: 'Seasons management',
    path: 'season-view',
    loadComponent: () => SeasonsEditor
  },
  {
    title: 'Services management',
    canActivate: [currentSeasonGuard],
    path: 'service-manager',
    loadComponent: ()=> ServiceEditor
  }
];
