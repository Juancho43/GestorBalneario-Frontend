import { Routes } from '@angular/router';
import {ShadowAdminPanel} from './components/panels/shadow-admin-panel/shadow-admin-panel';
import {ShadowViewer} from './shadow-viewer/shadow-viewer';
import {ShadowReservationPanel} from './components/panels/shadow-reservation-panel/shadow-reservation-panel';
import {ReservationEdit} from './reservation-edit/reservation-edit';
import {ReservationCreate} from './reservation-create/reservation-create';
import {MatMenuContent} from '@angular/material/menu';
import {MainMenu} from './components/layout/main-menu/main-menu';
import {AboutMenu} from './components/layout/about-menu/about-menu';
import {ShadowEditor} from './shadow-editor/shadow-editor';
import {ReservationViewer} from './reservation-viewer/reservation-viewer';

export const routes: Routes = [
  {
    title: 'About',
    path: 'about',
    component: AboutMenu
  },
  {
    title: 'Main Menu',
    path: '',
    component: MainMenu
  },
  {
    title: 'ShadowManager',
    path: 'shadow',
    component: ShadowAdminPanel,
    children: [
      {
        path: 'view',
        component: ShadowViewer
      },
      {
        path:'editor',
        component: ShadowEditor
      },
    ]
  },
  {
    title: 'Reservation',
    path: 'reservation',
    component: ShadowReservationPanel,
    children : [
      {
        title: 'View Reservations',
        path: 'view',
        component:ReservationViewer
      },
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
