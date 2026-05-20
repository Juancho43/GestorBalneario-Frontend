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
import {GetActiveReservationsHttp} from '../ReservationHttp/get-active-reservations-http';

@Injectable({
  providedIn: 'root',
})
export class ReservationManager {
  private create = inject(CreateReservationHttp);
  private update = inject(EditReservationHttp)
  private delete = inject(DeleteReservationHttp);
  private  getActiveHttp = inject(GetActiveReservationsHttp);
  private allReservationsHttp = inject(GetAllReservationsHttp);
  private activeResource = rxResource({
    params: ()=>this.query(),
    stream:({params}) => this.getActiveHttp.get(params)
  })
  private query = signal<PaginatedQuery>({ query:'',page:0,pageSize:10});
  private reservationsResource= rxResource({
    params: ()=>this.query(),
    stream:({params})=> this.allReservationsHttp.get(params)
  })
  currentReservation = signal<ReservationEntity| null>(null);
  /*
  * A list of the current reservations. It is updated when a shadow is added, updated or deleted.
  * */
  private reservations = linkedSignal(()=>
    this.reservationsResource.isLoading() || this.reservationsResource.error() ? [] : this.reservationsResource.value()!.data!
  )
  private activeReservations = linkedSignal(()=>
    this.activeResource.isLoading() || this.activeResource.error() ? [] : this.activeResource.value()!.data!
  )
  getActive(){
    return this.activeReservations();
  }
  getList(){
    return this.reservations();
  }

  addReservation(reservation:ReservationEntity) {
    this.create.create(reservation).subscribe(r=>{
      this.currentReservation.set(r.data!);
    });
  }

  updateReservation(entity: ReservationEntity){
    this.update.update(entity).subscribe(r => {
      this.currentReservation.set(r.data!);
    })
  }

  deleteReservation(entity: ReservationEntity){
    this.delete.delete(entity.id!).subscribe();
  }
  getQuery(){
    return this.query()
  }
  updateQuery(query: PaginatedQuery){
    this.query.set(query);
  }
}
