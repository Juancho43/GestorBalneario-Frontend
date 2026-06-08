import {Component, input, output} from '@angular/core';
import {ClientEntity} from '../../../core/model/clientEntity';
import {MatCard} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {RouterLink} from '@angular/router';
import {Card} from '../../layout/card/card';

@Component({
  selector: 'app-client-card',
  imports: [
    MatCard,
    MatIcon,
    RouterLink,
    Card,
  ],
  templateUrl: './client-card.html',
  styleUrl: './client-card.scss',
})
export class ClientCard {
  readonly client = input.required<ClientEntity>();
  readonly actions = input<boolean>(true);
  // selected = output<ClientEntity>()
  edit = output<ClientEntity>()
  delete = output<ClientEntity>()
  protected options = [
    {
      label:"ver detalles",
      icon:"open_in_new",
      value:"see-details"
    },
    {
      label:"editar",
      icon:"edit",
      value:"edit"
    },
    {
      label:"eliminar",
      icon:"delete",
      value:"delete"
    }
  ]

  protected handleMenuOption(value: string) {
    switch(value){
      case 'see-details':
        // this.selected.emit(this.client());
        break;
      case'edit':
        this.edit.emit(this.client());
        break;
      case 'delete':
        this.delete.emit(this.client());
        break;
    }
  }
}
