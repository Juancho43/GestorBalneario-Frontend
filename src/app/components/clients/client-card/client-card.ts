import {Component, input} from '@angular/core';
import {ClientEntity} from '../../../core/model/clientEntity';
import {MatCard} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-client-card',
  imports: [
    MatCard,
    MatIcon
  ],
  templateUrl: './client-card.html',
  styleUrl: './client-card.scss',
})
export class ClientCard {
  readonly client = input.required<ClientEntity>();
}
