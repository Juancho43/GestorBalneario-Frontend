import {Component, computed, inject} from '@angular/core';
import {ReservationListManager} from '../../../core/services/Managers/reservation-list-manager';
import {JsonPipe} from '@angular/common';
import {ClientCard} from '../../clients/client-card/client-card';
import {ShadowCard} from '../../shadows/shadow-card/shadow-card';
import {GetReservationDetailsHttp} from '../../../core/services/ReservationHttp/get-reservation-details-http';
import {rxResource} from '@angular/core/rxjs-interop';
import {InvoiceCard} from '../../invoices/invoice-card/invoice-card';

@Component({
  selector: 'app-reservation-detail',
  imports: [
    JsonPipe,
    ClientCard,
    ShadowCard,
    InvoiceCard
  ],
  templateUrl: './reservation-detail.html',
  styleUrl: './reservation-detail.scss',
})
export class ReservationDetail {
  private reservationListManager = inject(ReservationListManager);
  private getDetails = inject(GetReservationDetailsHttp);
  reservation = computed(() => this.reservationListManager.currentReservation());
  reservationResource = rxResource({
    params:() =>{return{id:this.reservation()?.id!}},
    stream:({params}) => this.getDetails.get(params.id)
  })
  details = computed(()=>this.reservationResource.value())
}
