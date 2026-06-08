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
  selected = output<ClientEntity>()
  edit = output<ClientEntity>()
  delete = output<ClientEntity>()
  protected options = [
    {
      label:"Editar",
      icon:"edit",
      value:"edit"
    },
    {
      label:"Eliminar",
      icon:"delete",
      value:"delete"
    }
  ]

  protected handleMenuOption(value: string,client: ClientEntity) {
    switch(value){
      case'edit':
        this.edit.emit(client);
        break;
      case 'delete':
        this.delete.emit(client);
        break;
    }
  }
}
