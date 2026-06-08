import {Component, input, output} from '@angular/core';
import {ReservationEntity} from '../../../core/model/reservationEntity';
import {MatIcon} from '@angular/material/icon';
import {CustomMenu} from '../../layout/custom-menu/custom-menu';
import {ReservationStatePipe} from '../../../core/utils/pipes/reservation-state-pipe';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-reservation-list',
  imports: [
    MatIcon,
    CustomMenu,
    ReservationStatePipe,
    DatePipe
  ],
  templateUrl: './reservation-list.html',
  styleUrl: './reservation-list.scss',
})
export class ReservationList {
  readonly list = input.required<ReservationEntity[]>();
  protected options = [
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
  selectedReservation = output<ReservationEntity>();
  edit = output<ReservationEntity>()
  delete = output<ReservationEntity>()

  protected handleMenuOption(value: string,reservation: ReservationEntity) {
    switch(value){
      case'edit':
        this.edit.emit(reservation);
        break;
      case 'delete':
        this.delete.emit(reservation);
        break;
    }
  }
}

