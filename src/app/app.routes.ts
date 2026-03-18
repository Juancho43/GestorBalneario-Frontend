import { Routes } from '@angular/router';
import {ShadowAdminPanel} from './components/panels/shadow-admin-panel/shadow-admin-panel';
import ShadowViewer from './components/shadows/shadow-viewer/shadow-viewer';
import {ShadowReservationPanel} from './components/panels/shadow-reservation-panel/shadow-reservation-panel';
import {ReservationEdit} from './components/reservations/reservation-edit/reservation-edit';
import {ReservationCreate} from './components/reservations/reservation-create/reservation-create';
import {MainMenu} from './components/layout/main-menu/main-menu';
import {AboutMenu} from './components/layout/about-menu/about-menu';
import ShadowEditor from './components/shadows/shadow-editor/shadow-editor';
import {ReservationViewer} from './components/reservations/reservation-viewer/reservation-viewer';
import {ClientManager} from './components/panels/client-manager/client-manager';
import {ClientViewer} from './components/clients/client-viewer/client-viewer';
import {ClientEditor} from './components/clients/client-editor/client-editor.component';

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
        loadComponent: ()=> ShadowViewer
      },
      {
        path:'editor',
        loadComponent: ()=> ShadowEditor
      },
    ]
  },
  {
    title: 'ReservationManager',
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
  },
  {
    title: 'ClientManager',
    path: 'client',
    component: ClientManager,
    children: [
      {
        title: 'View',
        path: 'view',
        component: ClientViewer
      },
      {
        title: 'Client manage',
        path: 'create',
        component: ClientEditor
      }
    ]
  }


];
