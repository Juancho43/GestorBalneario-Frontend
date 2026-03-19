import {Component, input} from '@angular/core';
import {ShadowEntity} from '../../../core/model/shadowEntity';
import {JsonPipe} from '@angular/common';
import {MatCard} from '@angular/material/card';

@Component({
  selector: 'app-shadow-card',
  imports: [
    JsonPipe,
    MatCard
  ],
  templateUrl: './shadow-card.html',
  styleUrl: './shadow-card.scss',
})
export class ShadowCard {
  readonly shadow = input.required<ShadowEntity>()
}
