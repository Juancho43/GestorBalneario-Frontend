import {Component, input} from '@angular/core';
import {ShadowEntity} from '../../../core/model/shadowEntity';
import {MatIcon} from '@angular/material/icon';
import {RouterLink} from '@angular/router';
import {Card} from '../../layout/card/card';

@Component({
  selector: 'app-shadow-card',
  imports: [
    MatIcon,
    RouterLink,
    Card
  ],
  templateUrl: './shadow-card.html',
  styleUrl: './shadow-card.scss',
})
export class ShadowCard {
  readonly shadow = input.required<ShadowEntity>()
}
