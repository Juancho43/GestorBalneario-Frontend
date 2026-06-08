import {Component, computed, effect, inject, input, signal} from '@angular/core';
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
  readonly id = input<string>();
  protected singlePane = signal(false);
  protected currentPane = signal('list');
  protected currentReservation = computed(()=>this.manager.currentReservationDetails());
  protected showList = computed(()=> this.singlePane() || this.currentPane() === 'list');
  protected showDetails = computed(()=> this.singlePane() || this.currentPane() === 'detail');
  constructor(){
    (new BreakpointObserver()).observe([Breakpoints.XSmall,Breakpoints.Small]).subscribe(result => {
      this.singlePane.set(!result.matches);
    })
    effect(() => {
      if(this.id() !== undefined){
        this.handleSelectReservation(this.id()!);
      }
    })
  }


  protected handleFABButton() {
    this.router.navigateByUrl('/reservation-create');
  }

  protected handleSelectReservation($event: string) {
    this.currentPane.set('detail');
    this.manager.selectedReservationId.set($event);
  }

  protected handleEdit($event: ReservationEntity) {
    console.log("EDITING");
  }

  protected handleDelete($event: ReservationEntity) {
    console.log("Deleting");
  }
}
