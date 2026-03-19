import {Component, input} from '@angular/core';
import {ClientEntity} from '../../../core/model/clientEntity';
import {MatCard} from '@angular/material/card';

@Component({
  selector: 'app-client-card',
  imports: [
    MatCard
  ],
  templateUrl: './client-card.html',
  styleUrl: './client-card.scss',
})
export class ClientCard {
  readonly client = input.required<ClientEntity>();
}
