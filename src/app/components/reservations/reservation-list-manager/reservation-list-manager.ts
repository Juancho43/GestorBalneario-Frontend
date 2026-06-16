import {Component, computed, inject, OnDestroy, output} from '@angular/core';
import {ReservationSearcher} from '../reservation-searcher/reservation-searcher';
import {ReservationList} from '../reservation-list/reservation-list';
import {ReservationManager} from '../../../core/services/Managers/reservation-manager.service';
import {ReservationEntity} from '../../../core/model/reservationEntity';
import {Paginator} from '../../layout/paginator/paginator';
import {SearchBarData} from '../../../core/Interfaces/SearchInterfaces';
import {FABButton} from '../../layout/fab-button/fab-button';
import {emptySearchQuery} from '../../../core/services/other/const';

@Component({
  selector: 'app-reservation-list-manager',
  imports: [
    ReservationSearcher,
    ReservationList,
    Paginator,
    FABButton
  ],
  templateUrl: './reservation-list-manager.html',
  styleUrl: './reservation-list-manager.scss',
})
export class ReservationListManager implements OnDestroy{
  private manager = inject(ReservationManager);
  protected list = computed(()=> this.manager.reservationsToDisplay())
  protected query = computed(()=>this.manager.searchQuery().pagination)

  selectedReservation = output<ReservationEntity>()
  edit = output<ReservationEntity>()
  delete = output<ReservationEntity>()
  create = output();

  ngOnDestroy(): void {
    this.manager.searchQuery.set(emptySearchQuery);
  }
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

  protected selectReservation(reservation: ReservationEntity){
    this.selectedReservation.emit(reservation);
  }

  protected editReservation($event: ReservationEntity) {
   this.edit.emit($event);
  }

  protected deleteReservation($event: ReservationEntity) {
    this.delete.emit($event);
  }
}
