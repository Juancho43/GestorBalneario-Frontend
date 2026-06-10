import {Component, HostListener, inject, linkedSignal, signal, ViewChild} from '@angular/core';
import {ReservationForm} from '../../components/reservations/reservation-form/reservation-form';
import {ReservationManager} from '../../core/services/Managers/reservation-manager.service';
import {ShadowMap} from '../../components/shadows/shadow-map/shadow-map';
import {ShadowManager} from '../../core/services/Managers/shadow-manager.service';
import {ClientEntity} from '../../core/model/clientEntity';
import {ClientCard} from '../../components/clients/client-card/client-card';
import {Dialog} from '@angular/cdk/dialog';
import {ClientManagerDialog} from '../../components/clients/client-searcher-dialog/client-manager-dialog.component';
import {ClientManager} from '../../core/services/Managers/client-manager.service';
import {ReservationEntity} from '../../core/model/reservationEntity';
import {ShadowCard} from '../../components/shadows/shadow-card/shadow-card';
import {ShadowEntity} from '../../core/model/shadowEntity';
import {FABButton} from '../../components/layout/fab-button/fab-button';
import {SideSheet} from '../../components/layout/side-sheet/side-sheet';
import {DialogHelper} from '../../core/utils/dialog-helper';
import {ComponentCanDeactivate} from '../../core/utils/PendingChanges';

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
export class ReservationCreate implements ComponentCanDeactivate{

  private reservationListManager = inject(ReservationManager);
  private shadowManager = inject(ShadowManager);
  private clientManager = inject(ClientManager);
  private dialog = inject(DialogHelper);
  sideSheetOpen = signal(false);
  @ViewChild('reservationForm') reservationForm!: ReservationForm;
  shadows = this.shadowManager.shadows;
  client = linkedSignal(()=>this.clientManager.currentClient());
  shadow = linkedSignal(()=>this.shadows()[0] || null);
  handleSubmit(reservation: ReservationEntity) {
    if (!this.reservationForm.editMode()){
      this.reservationListManager.addReservation(reservation);
    }else{
      this.reservationListManager.updateReservation(reservation);
    }
  }
  canDeactivate(): boolean {
    return !this.reservationForm.reservationForm().dirty;
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any): void {
    if (!this.canDeactivate()) {
      $event.returnValue = true;
    }
  }
  openClientDialog(): void {
    const config = {
      ...this.dialog.getConfig(),
      height: (window.innerHeight * 0.7) + 'px',
    }
    this.dialog.openDialog(ClientManagerDialog,config);
  }
  protected setShadow(event: any) {
   this.shadow.set(this.shadowManager.getByIdentifier(event._objects[1].text)!);
  }
}
