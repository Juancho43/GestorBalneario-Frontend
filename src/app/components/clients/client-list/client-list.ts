import {Component, input, output} from '@angular/core';
import {ClientCard} from '../client-card/client-card';
import {ClientEntity} from '../../../core/model/clientEntity';

@Component({
  selector: 'app-client-list',
  imports: [
    ClientCard
  ],
  templateUrl: './client-list.html',
  styleUrl: './client-list.scss',
})
export class ClientList {
  readonly list = input.required<ClientEntity[]>()
  selected = output<ClientEntity>()

}
