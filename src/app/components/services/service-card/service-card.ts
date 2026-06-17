import {Component, input, output, signal} from '@angular/core';
import {ServiceEntity} from '../../../core/model/serviceEntity';
import {CurrencyPipe} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {MatCard} from '@angular/material/card';
import {ServiceTypePipe} from '../../../core/utils/pipes/service-type-pipe';
import {Card} from '../../layout/card/card';

@Component({
  selector: 'app-service-card',
  imports: [
    CurrencyPipe,
    MatIcon,
    MatCard,
    ServiceTypePipe,
    Card
  ],
  templateUrl: './service-card.html',
  styleUrl: './service-card.scss',
})
export class ServiceCard {
  readonly service = input.required<ServiceEntity>();
}
