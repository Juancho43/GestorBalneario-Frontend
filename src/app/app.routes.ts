import { Routes } from '@angular/router';
import {ShadowAdminPanel} from './shadow-admin-panel/shadow-admin-panel';
import {ShadowViewer} from './shadow-viewer/shadow-viewer';
import {ShadowReservationPanel} from './shadow-reservation-panel/shadow-reservation-panel';

export const routes: Routes = [
  {
    title: 'Edit',
    path: 'edit',
    component: ShadowAdminPanel
  },
  {
    title: 'View',
    path: '',
    component: ShadowViewer
  },
  {
    title: 'Reservation',
    path: 'reservation',
    component: ShadowReservationPanel
  }


];
