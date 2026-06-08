import {Component, input} from '@angular/core';
import {ClientEntity} from '../../../core/model/clientEntity';
import {MatIcon} from '@angular/material/icon';
import {RouterLink} from '@angular/router';
import {Card} from '../../layout/card/card';

@Component({
  selector: 'app-client-card',
  imports: [
    MatIcon,
    RouterLink,
    Card,
  ],
  templateUrl: './client-card.html',
  styleUrl: './client-card.scss',
})
export class ClientCard {
  readonly client = input.required<ClientEntity>();

}
