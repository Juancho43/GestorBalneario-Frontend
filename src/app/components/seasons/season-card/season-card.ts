import {Component, input, output} from '@angular/core';
import {SeasonEntity} from '../../../core/model/SeasonEntity';
import {DatePipe} from '@angular/common';
import {MatCard} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {Card} from '../../layout/card/card';

@Component({
  selector: 'app-season-card',
  imports: [
    MatCard,
    MatIcon,
    DatePipe,
    Card
  ],
  templateUrl: './season-card.html',
  styleUrl: './season-card.scss',
})
export class SeasonCard {
  readonly season = input.required<SeasonEntity>();
}
