import {Component, input, output} from '@angular/core';
import {ClientEntity} from '../../../core/model/clientEntity';
import {MatIcon} from '@angular/material/icon';
import {CustomMenu} from '../../layout/custom-menu/custom-menu';

@Component({
  selector: 'app-client-list',
  imports: [
    MatIcon,
    CustomMenu,
  ],
  templateUrl: './client-list.html',
  styleUrl: './client-list.scss',
})
export class ClientList {
  readonly list = input.required<ClientEntity[]>()
  readonly actions = input<boolean>(false)
  selected = output<ClientEntity>()
  edit = output<ClientEntity>()
  delete = output<ClientEntity>()
}
