import {inject, Injectable, linkedSignal, signal} from '@angular/core';
import {ReservationEntity} from '../../model/reservationEntity';
import {GetClientsHttp, PaginatedQuery} from '../ClientHttp/get-clients-http';
import {CreateClientHttp} from '../ClientHttp/create-client-http';
import {EditClientHttp} from '../ClientHttp/edit-client-http';
import {DeleteClientHttp} from '../ClientHttp/delete-client-http';
import {GetAllReservationsHttp} from '../ReservationHttp/get-all-reservations-http';
import {CreateReservationHttp} from '../ReservationHttp/create-reservation-http';
import {EditReservationHttp} from '../ReservationHttp/edit-reservation-http';
import {DeleteReservationHttp} from '../ReservationHttp/delete-reservation-http';
import {rxResource} from '@angular/core/rxjs-interop';
import {ClientEntity} from '../../model/clientEntity';

@Injectable({
  providedIn: 'root',
})
export class ReservationListManager {

  private allReservationsHttp = inject(GetAllReservationsHttp);
  private create = inject(CreateReservationHttp);
  private update = inject(EditReservationHttp)
  private delete = inject(DeleteReservationHttp);
  private query = signal<PaginatedQuery>({ query:'',page:1,pageSize:10});
  private reservationsResource= rxResource({
    params: ()=>this.query(),
    stream:({params})=> this.allReservationsHttp.get(params)
  })
  currentReservation = signal<ReservationEntity| null>(null);
  /*
  * A list of the current reservations. It is updated when a shadow is added, updated or deleted.
  * */
  private reservations = linkedSignal(()=>
    this.reservationsResource.isLoading() || this.reservationsResource.error() ? [] : this.reservationsResource.value()!
  )


  getList(){
    return this.reservations();
  }

  addReservation(reservation:ReservationEntity) {
    this.create.create(reservation).subscribe(r=>{
      this.currentReservation.set(r);
    });
  }

  updateClient(entity: ReservationEntity){
    this.update.update(entity).subscribe(r => {
      this.currentReservation.set(r);
    })
  }

  deleteClient(entity: ReservationEntity){
    this.delete.delete(entity.id!).subscribe();
  }

}
