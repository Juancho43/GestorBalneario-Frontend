import {Component, input, output} from '@angular/core';
import {SeasonEntity} from '../../../core/model/SeasonEntity';
import {MatIcon} from '@angular/material/icon';
import {DatePipe} from '@angular/common';
import {CustomMenu} from '../../layout/custom-menu/custom-menu';

@Component({
  selector: 'app-season-list',
  imports: [
    MatIcon,
    DatePipe,
    CustomMenu,
  ],
  templateUrl: './season-list.html',
  styleUrl: './season-list.scss',
})
export class SeasonList {
  readonly list = input.required<SeasonEntity[]>();

  edit = output<SeasonEntity>()
  delete = output<SeasonEntity>()

}
