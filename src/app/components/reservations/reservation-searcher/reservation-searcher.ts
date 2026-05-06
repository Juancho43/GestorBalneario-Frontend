import { Component } from '@angular/core';
import {MatCheckbox} from '@angular/material/checkbox';

@Component({
  selector: 'app-reservation-searcher',
  imports: [
    MatCheckbox
  ],
  templateUrl: './reservation-searcher.html',
  styleUrl: './reservation-searcher.scss',
})
export class ReservationSearcher {}
