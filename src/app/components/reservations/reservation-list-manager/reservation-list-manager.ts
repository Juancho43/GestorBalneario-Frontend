import {Component, computed, inject, output} from '@angular/core';
import {ReservationSearcher} from '../reservation-searcher/reservation-searcher';
import {ReservationList} from '../reservation-list/reservation-list';
import {ReservationManager} from '../../../core/services/Managers/reservation-manager.service';
import {ReservationEntity} from '../../../core/model/reservationEntity';
import {Paginator} from '../../layout/paginator/paginator';
import {SearchBarData} from '../../../core/Interfaces/SearchInterfaces';

@Component({
  selector: 'app-reservation-list-manager',
  imports: [
    ReservationSearcher,
    ReservationList,
    Paginator
  ],
  templateUrl: './reservation-list-manager.html',
  styleUrl: './reservation-list-manager.scss',
})
export class ReservationListManager {
  private manager = inject(ReservationManager);
  selectedReservation = output<ReservationEntity>()
  protected list = computed(()=> this.manager.reservationsToDisplay())
  protected selectReservation(reservation: ReservationEntity){
    this.selectedReservation.emit(reservation);
  }

  protected query = computed(()=>this.manager.searchQuery().pagination)


  protected handleSearch($event: SearchBarData) {
    this.manager.searchQuery.update((p) => ({
      ...p,
      search: $event
    }))
  }

  protected handlePage($event:number) {
    this.manager.searchQuery.update((p) => ({
      ...p,
      pagination:{
        page: $event,
        limit:10
      }
    }))
  }

}
