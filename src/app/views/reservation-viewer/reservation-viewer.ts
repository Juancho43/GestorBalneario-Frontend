import {Component, computed, inject, signal} from '@angular/core';
import {ReservationListManager} from '../../components/reservations/reservation-list-manager/reservation-list-manager';
import {ReservationDetail} from '../../components/reservations/reservation-detail/reservation-detail';
import {FABButton} from '../../components/layout/fab-button/fab-button';
import {Router} from '@angular/router';
import {ReservationManager} from '../../core/services/Managers/reservation-manager.service';
import {MatIcon} from '@angular/material/icon';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {ReservationEntity} from '../../core/model/reservationEntity';

@Component({
  selector: 'app-reservation-viewer',
  imports: [
    ReservationListManager,
    ReservationDetail,
    FABButton,
    MatIcon,
    ReservationDetail,
  ],
  templateUrl: './reservation-viewer.html',
  styleUrl: './reservation-viewer.scss',
})
export class ReservationViewer {
  private router = inject(Router);
  private manager = inject(ReservationManager);
  protected singlePane = signal(false);
  protected currentPane = signal('list');
  protected currentReservation = computed(()=>this.manager.currentReservationDetails());
  protected showList = computed(()=> this.singlePane() || this.currentPane() === 'list');
  protected showDetails = computed(()=> this.singlePane() || this.currentPane() === 'detail');
  constructor(){
    (new BreakpointObserver()).observe([Breakpoints.XSmall,Breakpoints.Small]).subscribe(result => {
      this.singlePane.set(!result.matches);
    })
  }


  protected handleFABButton() {
    this.router.navigateByUrl('/reservation-create');
  }

  protected handleSelectReservation($event: ReservationEntity) {
    this.currentPane.set('detail');
    this.manager.selectedReservationId.set($event.id!);
  }
}
