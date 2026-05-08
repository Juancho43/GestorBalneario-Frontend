import {Component, input, output} from '@angular/core';
import {SeasonEntity} from '../../../core/model/SeasonEntity';
import {SeasonCard} from '../season-card/season-card';

@Component({
  selector: 'app-season-list',
  imports: [
    SeasonCard
  ],
  templateUrl: './season-list.html',
  styleUrl: './season-list.scss',
})
export class SeasonList {
  readonly list = input.required<SeasonEntity[]>();

  edit = output<SeasonEntity>()
  delete = output<SeasonEntity>()

}
