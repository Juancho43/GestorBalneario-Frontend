import { Routes } from '@angular/router';
import ShadowViewer from './components/shadows/shadow-viewer/shadow-viewer';
import {ReservationCreate} from './components/reservations/reservation-create/reservation-create';
import MainMenu from './components/layout/main-menu/main-menu';
import {AboutMenu} from './components/layout/about-menu/about-menu';
import ShadowEditor from './components/shadows/shadow-editor/shadow-editor';
import {ReservationViewer} from './components/reservations/reservation-viewer/reservation-viewer';
import {ClientViewer} from './components/clients/client-viewer/client-viewer';
import {PaymentViewer} from './components/payments/payment-viewer/payment-viewer';
import PaymentEditor from './components/payments/payment-editor/payment-editor';
import SeasonSwitch from './components/seasons/season-switch/season-switch';

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
    path: 'payment-create',
    loadComponent: ()=> PaymentEditor
  },
  {
    title: 'Payments reports',
    path: 'payment-view',
    loadComponent: () => PaymentViewer
  },
  {
    title: 'Seasons list',
    path: 'season-view',
    loadComponent: () => SeasonSwitch
  }
];
