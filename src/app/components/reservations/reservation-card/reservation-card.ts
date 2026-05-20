import {Component, computed, inject, input, output} from '@angular/core';
import {DatePipe} from '@angular/common';
import {ReservationEntity} from '../../../core/model/reservationEntity';
import {MatCard} from '@angular/material/card';
import {Dialog} from '@angular/cdk/dialog';
import {ReservationDetail} from '../reservation-detail/reservation-detail';
import {ReservationManager} from '../../../core/services/Managers/reservation-manager.service';
import {CustomMenu} from '../../layout/custom-menu/custom-menu';
import {ReservationStatePipe} from '../../../core/utils/pipes/reservation-state-pipe';

@Component({
  selector: 'app-reservation-card',
  imports: [MatCard, DatePipe, CustomMenu, ReservationStatePipe],
  templateUrl: './reservation-card.html',
  styleUrl: './reservation-card.scss',
})
export class ReservationCard {
  private reservationListManager = inject(ReservationManager);
  readonly reservation = input.required<ReservationEntity>();
  duration = computed(()=> (new Date(this.reservation().dates.checkOut)).getDate() -(new Date(this.reservation().dates.checkIn)).getDate());
  dialog = inject(Dialog);
  edit = output<boolean>();
  protected openDetailDialog() {
    this.reservationListManager.currentReservation.set(this.reservation());
    this.dialog.open(ReservationDetail);
  }
  protected options = [
    {
      label:"Ver detalles",
      icon:"open_in_new",
      value:"see-details"
    },
    {
      label:"Editar",
      icon:"edit",
      value:"edit"
    },
    {
      label:"Eliminar",
      icon:"delete",
      value:"delete"
    }
  ]
  handleMenuOption(value:string){
    switch(value){
      case 'see-details':
        this.openDetailDialog();
        break;
      case'edit':
        this.reservationListManager.currentReservation.set(this.reservation());
        this.edit.emit(true);
        break;
      case 'delete':
        this.reservationListManager.deleteReservation(this.reservation())
    }
  }
}
