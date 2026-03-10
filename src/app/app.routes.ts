import { Routes } from '@angular/router';
import {ShadowAdminPanel} from './components/panels/shadow-admin-panel/shadow-admin-panel';
import {ShadowViewer} from './shadow-viewer/shadow-viewer';
import {ShadowReservationPanel} from './components/panels/shadow-reservation-panel/shadow-reservation-panel';
import {ReservationEdit} from './reservation-edit/reservation-edit';
import {ReservationCreate} from './reservation-create/reservation-create';

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
    component: ShadowReservationPanel,
    children : [
      {
        title: 'Edit Reservation',
        path: 'edit/:id',
        component: ReservationEdit
      },
      {
        title: 'Create Reservation',
        path: 'create',
        component: ReservationCreate
      }
    ]
  }


];
