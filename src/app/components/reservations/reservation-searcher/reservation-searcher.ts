import {Component, inject, output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatIcon} from '@angular/material/icon';
import {FilterButton} from '../../layout/filter-button/filter-button';
import {ReservationForm} from '../reservation-form/reservation-form';
import {OverlayHelper} from '../../../core/utils/overlay-helper';

@Component({
  selector: 'app-reservation-searcher',
  imports: [
    FormsModule,
    MatIcon,
    FilterButton
  ],
  templateUrl: './reservation-searcher.html',
  styleUrl: './reservation-searcher.scss',
})
export class ReservationSearcher {
  private overlay = inject(OverlayHelper);
  activeSelect=output<boolean>()
  filterOpen = false;
  protected searchTerm: any;
  protected component = ReservationForm;

  protected handleFilter() {
    const config = this.overlay.getModalConfig();
    if(!this.filterOpen){
      this.filterOpen = true;
      const overlayRef = this.overlay.open(ReservationForm, config);
      overlayRef.backdropClick().subscribe(() => {
        overlayRef!.dispose();
        this.filterOpen = false
      });
    }
  }

  protected submitHandler() {

  }
}
