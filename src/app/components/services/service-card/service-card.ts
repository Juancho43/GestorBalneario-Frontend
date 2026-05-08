import {Component, EventEmitter, input, output, Output, signal} from '@angular/core';
import {ServiceEntity} from '../../../core/model/serviceEntity';
import {CurrencyPipe} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {MatCard} from '@angular/material/card';

@Component({
  selector: 'app-service-card',
  imports: [
    CurrencyPipe,
    MatIcon,
    MatCard
  ],
  templateUrl: './service-card.html',
  styleUrl: './service-card.scss',
})
export class ServiceCard {
  readonly service = input.required<ServiceEntity>();
  protected readonly actions = signal<boolean >(true);
  selected=output<ServiceEntity>()
  edit=output<ServiceEntity>()
  delete=output<ServiceEntity>()
}
