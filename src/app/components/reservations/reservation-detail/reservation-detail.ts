import {Component, computed, effect, inject, input, OnDestroy} from '@angular/core';
import {ReservationManager} from '../../../core/services/Managers/reservation-manager.service';
import {DatePipe} from '@angular/common';
import {GetReservationDetailsHttp} from '../../../core/services/ReservationHttp/get-reservation-details-http';
import {rxResource} from '@angular/core/rxjs-interop';
import {InvoiceDetails} from '../../invoices/invoice-details/invoice-details';
import {InvoiceManager} from '../../../core/services/Managers/invoice-manager.service';
import {ReservationStatePipe} from '../../../core/utils/pipes/reservation-state-pipe';
import {Dialog} from '@angular/cdk/dialog';
import {ReservationEntity} from '../../../core/model/reservationEntity';

@Component({
  selector: 'app-reservation-detail',
  imports: [
    DatePipe,
    InvoiceDetails,
    ReservationStatePipe,
  ],
  templateUrl: './reservation-detail.html',
  styleUrl: './reservation-detail.scss',
})
export class ReservationDetail implements OnDestroy{
  private getDetails = inject(GetReservationDetailsHttp);
  private invoiceManager = inject(InvoiceManager);
  private manager = inject(ReservationManager);
  private dialog = inject(Dialog);
  reservation = input<ReservationEntity>();
  reservationResource = rxResource({
    params:() =>{return{id:this.reservation()?.id!}},
    stream:({params}) => this.getDetails.get(params.id)
  })
  reservationData = computed(()=>this.reservationResource.value()?.data!)
  constructor() {
    effect(() => {
      if(this.reservationData()){
        this.invoiceManager.currentInvoice.set(this.reservationData()?.invoice!.id!)
      }
    });
  }

  ngOnDestroy(): void {
    this.manager.currentReservation.set(null);
    }

  protected closeModal() {
    this.dialog.closeAll();
  }
}
