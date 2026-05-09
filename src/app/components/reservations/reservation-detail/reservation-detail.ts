import {Component, computed, effect, inject} from '@angular/core';
import {ReservationManager} from '../../../core/services/Managers/reservation-manager.service';
import {DatePipe} from '@angular/common';
import {GetReservationDetailsHttp} from '../../../core/services/ReservationHttp/get-reservation-details-http';
import {rxResource} from '@angular/core/rxjs-interop';
import {InvoiceDetails} from '../../invoices/invoice-details/invoice-details';
import {InvoiceManager} from '../../../core/services/Managers/invoice-manager.service';

@Component({
  selector: 'app-reservation-detail',
  imports: [
    DatePipe,
    InvoiceDetails
  ],
  templateUrl: './reservation-detail.html',
  styleUrl: './reservation-detail.scss',
})
export class ReservationDetail {

  private invoiceManager = inject(InvoiceManager);
  private reservationListManager = inject(ReservationManager);
  private getDetails = inject(GetReservationDetailsHttp);
  reservation = computed(() => this.reservationListManager.currentReservation());
  reservationResource = rxResource({
    params:() =>{return{id:this.reservation()?.id!}},
    stream:({params}) => this.getDetails.get(params.id)
  })
  details = computed(()=>this.reservationResource.value()!.data!)
  constructor() {
    effect(() => {
      if(this.details()){
        this.invoiceManager.currentInvoice.set(this.details()?.invoice!.id!)
      }
    });
  }
}
