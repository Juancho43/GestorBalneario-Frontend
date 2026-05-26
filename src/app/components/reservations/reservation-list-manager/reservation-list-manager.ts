import {Component, computed, inject, output, signal} from '@angular/core';
import {Paginator} from '../../layout/paginator/paginator';
import {ReservationCard} from '../reservation-card/reservation-card';
import {ReservationSearcher} from '../reservation-searcher/reservation-searcher';
import {ReservationList} from '../reservation-list/reservation-list';
import {ReservationManager} from '../../../core/services/Managers/reservation-manager.service';
import {ReservationEntity} from '../../../core/model/reservationEntity';

@Component({
  selector: 'app-reservation-list-manager',
  imports: [
    ReservationSearcher,
    ReservationList
  ],
  templateUrl: './reservation-list-manager.html',
  styleUrl: './reservation-list-manager.scss',
})
export class ReservationListManager {
  private manager = inject(ReservationManager);
  selectedReservation = output<ReservationEntity>()
  protected reservations = computed(()=>
  {
      return this.manager.getList();
  });
  protected selectReservation(reservation: ReservationEntity){
    this.selectedReservation.emit(reservation);
  }
  searchQuery = signal<any>(null);
  protected handleSearch($event: any) {
    this.searchQuery.set($event)
  }
}
