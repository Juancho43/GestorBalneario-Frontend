import {Component, input, output} from '@angular/core';
import {ShadowEntity} from '../../../core/model/shadowEntity';
import {CustomMenu} from '../../layout/custom-menu/custom-menu';
import {MatIcon} from '@angular/material/icon';
import {ShadowStatePipe} from '../../../core/utils/pipes/shadow-state-pipe';

@Component({
  selector: 'app-shadow-list',
  imports: [
    CustomMenu,
    MatIcon,
    ShadowStatePipe,
  ],
  templateUrl: './shadow-list.html',
  styleUrl: './shadow-list.scss',
})
export class ShadowList {
  readonly list = input.required<ShadowEntity[]>();
  selectedShadow = output<ShadowEntity>();
}
