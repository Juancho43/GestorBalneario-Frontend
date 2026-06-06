import {computed, effect, inject, Injectable, signal} from '@angular/core';
import {ReservationEntity} from '../../model/reservationEntity';
import {CreateReservationHttp} from '../ReservationHttp/create-reservation-http';
import {EditReservationHttp} from '../ReservationHttp/edit-reservation-http';
import {DeleteReservationHttp} from '../ReservationHttp/delete-reservation-http';
import {rxResource} from '@angular/core/rxjs-interop';
import {SearchQuery} from '../../Interfaces/SearchInterfaces';
import {ReservationSearch} from '../ReservationHttp/reservation-search.service';
import {GetReservationDetailsHttp} from '../ReservationHttp/get-reservation-details-http';
import {ReservationDetailsDTO} from '../../Interfaces/Details/ReservationDetailsDTO';

@Injectable({
  providedIn: 'root',
})
export class ReservationManager {
  private searchHttp = inject(ReservationSearch)
  private create = inject(CreateReservationHttp);
  private update = inject(EditReservationHttp)
  private delete = inject(DeleteReservationHttp);
  private getDetailsHttp = inject(GetReservationDetailsHttp);

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
  currentReservationDetails = signal<ReservationDetailsDTO | undefined>(undefined);
  selectedReservationId = signal<null|string>(null);


  constructor() {
    effect(() => {
      this.selectedReservationId()
      this.getReservationDetails();
    });
  }

  getReservationDetails(){
    if(this.selectedReservationId()){
     const id = this.selectedReservationId()!;
      this.getDetailsHttp.get(id).subscribe({
        next : (r) =>{
          if(r.data){
            this.currentReservationDetails.set(r.data)
          }
        }
      })
    }
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

}
