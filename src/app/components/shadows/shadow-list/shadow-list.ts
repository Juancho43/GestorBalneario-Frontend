import {Component, input, output} from '@angular/core';
import {ShadowEntity} from '../../../core/model/shadowEntity';
import {CustomMenu} from '../../layout/custom-menu/custom-menu';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-shadow-list',
  imports: [
    CustomMenu,
    MatIcon,
  ],
  templateUrl: './shadow-list.html',
  styleUrl: './shadow-list.scss',
})
export class ShadowList {
  readonly list = input.required<ShadowEntity[]>();
  selectedReservation = output<ShadowEntity>();
}
