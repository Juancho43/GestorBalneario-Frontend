import {computed, inject, Injectable, signal} from '@angular/core';
import {ReservationEntity} from '../../model/reservationEntity';
import {CreateReservationHttp} from '../ReservationHttp/create-reservation-http';
import {EditReservationHttp} from '../ReservationHttp/edit-reservation-http';
import {DeleteReservationHttp} from '../ReservationHttp/delete-reservation-http';
import {rxResource} from '@angular/core/rxjs-interop';
import {SearchQuery} from '../../Interfaces/SearchInterfaces';
import {ReservationSearch} from '../ReservationHttp/reservation-search.service';

@Injectable({
  providedIn: 'root',
})
export class ReservationManager {
  private searchHttp = inject(ReservationSearch)
  private create = inject(CreateReservationHttp);
  private update = inject(EditReservationHttp)
  private delete = inject(DeleteReservationHttp);


  searchQuery = signal<SearchQuery>({
    pagination: {
      limit: 10,
      page:0,
    },
    search:{
      query: '',
      filters:{
        orderDirection:'asc',
        state:'All'
      }
    }
  })
  searchResource = rxResource({
    params: () => this.searchQuery(),
    stream:({params}) => this.searchHttp.execute(params)
  })
  reservationsToDisplay = computed(()=>{
    return this.searchResource.isLoading() || this.searchResource.error() ? [] : this.searchResource.value()?.data!
  })
  currentReservation = signal<ReservationEntity| null>(null);


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

}
