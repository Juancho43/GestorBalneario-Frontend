import {Component, input} from '@angular/core';
import {ShadowEntity} from '../../../core/model/shadowEntity';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-shadow-card',
  imports: [
    MatIcon
  ],
  templateUrl: './shadow-card.html',
  styleUrl: './shadow-card.scss',
})
export class ShadowCard {
  readonly shadow = input.required<ShadowEntity>()
}
