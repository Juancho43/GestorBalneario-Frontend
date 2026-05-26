import {Component, computed, inject, signal} from '@angular/core';
import {ReservationListManager} from '../../components/reservations/reservation-list-manager/reservation-list-manager';
import {ReservationDetail} from '../../components/reservations/reservation-detail/reservation-detail';
import {FABButton} from '../../components/layout/fab-button/fab-button';
import {Router} from '@angular/router';
import {ReservationManager} from '../../core/services/Managers/reservation-manager.service';
import {MatIcon} from '@angular/material/icon';
import {BreakpointObserver} from '@angular/cdk/layout';
import {ReservationEntity} from '../../core/model/reservationEntity';

@Component({
  selector: 'app-reservation-viewer',
  imports: [
    ReservationListManager,
    ReservationDetail,
    FABButton,
    MatIcon,
  ],
  templateUrl: './reservation-viewer.html',
  styleUrl: './reservation-viewer.scss',
})
export class ReservationViewer {
  private router = inject(Router);
  private manager = inject(ReservationManager);
  protected singlePane = signal(false);
  protected currentPane = signal('list');
  protected showList = computed(()=>{
    if(this.singlePane()) return true;
    return this.currentPane() === 'list';

  })
  protected showDetails = computed(()=>{
    if(this.singlePane()) return true;
    return this.currentPane() === 'detail';
  })
  protected selectedReservation = computed(()=>this.manager.currentReservation());

  constructor(){
    (new BreakpointObserver()).observe(['(max-width: 800px)']).subscribe(result => {
      if (result.matches) {
        this.singlePane.set(false);
      } else {
        this.singlePane.set(true);
      }
    })
  }
  protected handleFABButton() {
    this.router.navigateByUrl('/reservation-create');
  }

  protected handleSelectedReservation($event: ReservationEntity) {
    this.currentPane.set('detail');
    this.manager.currentReservation.set($event);
  }
}
