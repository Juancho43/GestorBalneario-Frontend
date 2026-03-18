import {Component, input} from '@angular/core';
import {JsonPipe} from '@angular/common';
import {ShadowEntity} from '../../../core/model/shadowEntity';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatChip} from '@angular/material/chips';

@Component({
  selector: 'app-shadow-detail',
  imports: [
    JsonPipe,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatChip
  ],
  templateUrl: './shadow-detail.html',
  styleUrl: './shadow-detail.scss',
})
export class ShadowDetail {
  shadow = input<ShadowEntity>();
}
