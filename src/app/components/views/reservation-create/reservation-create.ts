import {Component, inject, linkedSignal, signal, ViewChild} from '@angular/core';
import {ReservationForm} from '../../reservations/reservation-form/reservation-form';
import {ReservationManager} from '../../../core/services/Managers/reservation-manager.service';
import {ShadowMap} from '../../shadows/shadow-map/shadow-map';
import {ShadowManager} from '../../../core/services/Managers/shadow-manager.service';
import {ClientEntity} from '../../../core/model/clientEntity';
import {ClientCard} from '../../clients/client-card/client-card';
import {Dialog} from '@angular/cdk/dialog';
import {ClientManagerDialog} from '../../clients/client-searcher-dialog/client-manager-dialog.component';
import {ClientManager} from '../../../core/services/Managers/client-manager.service';
import {ReservationEntity} from '../../../core/model/reservationEntity';
import {ShadowCard} from '../../shadows/shadow-card/shadow-card';
import {ShadowEntity} from '../../../core/model/shadowEntity';
import {FABButton} from '../../layout/fab-button/fab-button';
import {SideSheet} from '../../layout/side-sheet/side-sheet';

@Component({
  selector: 'app-reservation-create',
  imports: [
    ShadowMap,
    ReservationForm,
    ClientCard,
    ShadowCard,
    FABButton,
    SideSheet
  ],
  templateUrl: './reservation-create.html',
  styleUrl: './reservation-create.scss',
})
export class ReservationCreate {
  private reservationListManager = inject(ReservationManager);
  private shadowManager = inject(ShadowManager);
  private clientManager = inject(ClientManager);
  private matDialog = inject(Dialog);
  sideSheetOpen = signal(false);
  @ViewChild('reservationForm') reservationForm!: ReservationForm;
  shadows = this.shadowManager.shadows;
  client = linkedSignal<ClientEntity>(()=>this.clientManager.currentClient() || {name: '', email: '', phone:''});
  shadow = signal(this.shadows()[0] ||
    {
      coords: {
        x:0,
        y:0
      }
    }as ShadowEntity);
  handleSubmit(reservation: ReservationEntity) {
    if (!this.reservationForm.editMode()){
      this.reservationListManager.addReservation(reservation);
    }else{
      this.reservationListManager.updateReservation(reservation);
    }
  }

  openClientDialog(): void {
       this.matDialog.open(ClientManagerDialog);
  }
  protected setShadow(event: any) {
   this.shadow.set(this.shadowManager.getByIdentifier(event._objects[1].text)!);
  }
}
