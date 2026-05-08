import {Component, output} from '@angular/core';
import {MatCheckbox, MatCheckboxChange} from '@angular/material/checkbox';

@Component({
  selector: 'app-reservation-searcher',
  imports: [
    MatCheckbox
  ],
  templateUrl: './reservation-searcher.html',
  styleUrl: './reservation-searcher.scss',
})
export class ReservationSearcher {
  activeSelect=output<boolean>()
  protected handleActive($event: MatCheckboxChange) {
    this.activeSelect.emit($event.checked);
  }
}
