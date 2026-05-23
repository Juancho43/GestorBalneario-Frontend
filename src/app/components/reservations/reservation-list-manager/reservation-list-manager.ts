import {Component, computed, inject, signal} from '@angular/core';
import {Paginator} from '../../paginator/paginator';
import {ReservationCard} from '../reservation-card/reservation-card';
import {ReservationSearcher} from '../reservation-searcher/reservation-searcher';
import {ReservationList} from '../reservation-list/reservation-list';
import {ReservationManager} from '../../../core/services/Managers/reservation-manager.service';

@Component({
  selector: 'app-reservation-list-manager',
  imports: [
    Paginator,
    ReservationCard,
    ReservationSearcher,
    ReservationList
  ],
  templateUrl: './reservation-list-manager.html',
  styleUrl: './reservation-list-manager.scss',
})
export class ReservationListManager {
  private manager = inject(ReservationManager);
  protected active = signal<boolean>(false);
  protected reservations = computed(()=>
  {
    if(this.active()){
      return this.manager.getActive();
    }else{
      return this.manager.getList();
    }
  });
}
