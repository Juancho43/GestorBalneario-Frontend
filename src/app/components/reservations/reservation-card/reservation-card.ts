import {Component, computed, input} from '@angular/core';
import {DatePipe} from '@angular/common';
import {ReservationEntity} from '../../../core/model/reservationEntity';
import {ReservationStatePipe} from '../../../core/utils/pipes/reservation-state-pipe';
import {MatIcon} from '@angular/material/icon';
import {RouterLink} from '@angular/router';
import {Card} from '../../layout/card/card';

@Component({
  selector: 'app-reservation-card',
  imports: [DatePipe, ReservationStatePipe, MatIcon, RouterLink, Card],
  templateUrl: './reservation-card.html',
  styleUrl: './reservation-card.scss',
})
export class ReservationCard {
  readonly reservation = input.required<ReservationEntity>();
  protected duration = computed(()=> (new Date(this.reservation().dates.checkOut)).getDate() -(new Date(this.reservation().dates.checkIn)).getDate());

  // protected options = [
  //   {
  //     label:"ver detalles",
  //     icon:"open_in_new",
  //     value:"see-details"
  //   },
  //   {
  //     label:"editar",
  //     icon:"edit",
  //     value:"edit"
  //   },
  //   {
  //     label:"eliminar",
  //     icon:"delete",
  //     value:"delete"
  //   }
  // ]
  // handleMenuOption(value:string){
  //   switch(value){
  //     case 'see-details':
  //       this.openDetailDialog();
  //       break;
  //     case'edit':
  //       this.reservationListManager.currentReservation.set(this.reservation());
  //       this.edit.emit(true);
  //       break;
  //     case 'delete':
  //       this.reservationListManager.deleteReservation(this.reservation())
  //   }
  // }
}
