import {Component, computed, inject, linkedSignal, signal} from '@angular/core';
import {ReservationManager} from '../../../core/services/Managers/reservation-manager.service';
import {ReservationCard} from '../../reservations/reservation-card/reservation-card';
import {ReservationSearcher} from '../../reservations/reservation-searcher/reservation-searcher';
import {ReservationForm} from '../../reservations/reservation-form/reservation-form';
import {ReservationEntity} from '../../../core/model/reservationEntity';
import {ReservationList} from '../../reservations/reservation-list/reservation-list';
import {Paginator} from '../../paginator/paginator';

@Component({
  selector: 'app-reservation-viewer',
  imports: [
    ReservationCard,
    ReservationSearcher,
    ReservationForm,
    Paginator,
    //
    // if (!currentSeason || !currentSeason.id) {
    //   return throwError(() => new Error('La temporada aún no está cargada.'));
    // }Paginator
  ],
  templateUrl: './reservation-viewer.html',
  styleUrl: './reservation-viewer.scss',
})
export class ReservationViewer {
  private manager = inject(ReservationManager);
  protected currentReservation = computed(() => this.manager.currentReservation());
  protected active = signal<boolean>(false);
  protected reservations = computed(()=>
  {
    if(this.active()){
      return this.manager.getActive();
    }else{
      return this.manager.getList();
    }
  });
  protected readonly editForm = signal<boolean>(false);
  query = linkedSignal(()=>this.manager.getQuery())
  protected handleSubmit($event: ReservationEntity) {
    if(this.editForm()){
      this.manager.updateReservation($event);
      this.handleReset();
    }
  }

  protected handleReset() {
    this.manager.currentReservation.set(null);
    this.editForm.set(false);
  }

  protected handlePageChanged($event: number) {
    this.manager.updateQuery({
      query: '',
      page: $event,
      pageSize: 6
    });
  }
}
