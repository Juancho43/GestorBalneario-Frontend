import {Component, input} from '@angular/core';
import {SeasonDetailsDTO} from '../../../core/Interfaces/Details/SeasonDetailsDTO';
import {SeasonCard} from '../season-card/season-card';

@Component({
  selector: 'app-season-details',
  imports: [
    SeasonCard
  ],
  templateUrl: './season-details.html',
  styleUrl: './season-details.scss',
})
export class SeasonDetails {
  readonly seasonData = input<SeasonDetailsDTO | undefined>(undefined);
}
