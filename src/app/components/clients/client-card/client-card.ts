import {Component, input} from '@angular/core';
import {ClientEntity} from '../../../core/model/clientEntity';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-client-card',
  imports: [
    JsonPipe
  ],
  templateUrl: './client-card.html',
  styleUrl: './client-card.scss',
})
export class ClientCard {
  readonly client = input<ClientEntity>();
}
