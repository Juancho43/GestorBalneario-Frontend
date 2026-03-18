import {Component, input} from '@angular/core';
import {JsonPipe} from '@angular/common';
import {ShadowEntity} from '../../../core/model/shadowEntity';

@Component({
  selector: 'app-shadow-detail',
  imports: [
    JsonPipe
  ],
  templateUrl: './shadow-detail.html',
  styleUrl: './shadow-detail.scss',
})
export class ShadowDetail {
  shadow = input<ShadowEntity>();
}
