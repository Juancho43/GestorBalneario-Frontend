import {Component, input, output} from '@angular/core';
import {ServiceEntity} from '../../../core/model/serviceEntity';
import {MatIcon} from '@angular/material/icon';
import {CustomMenu} from '../../layout/custom-menu/custom-menu';
import {ServiceTypePipe} from '../../../core/utils/pipes/service-type-pipe';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-service-list',
  imports: [
    MatIcon,
    CustomMenu,
    ServiceTypePipe,
    CurrencyPipe
  ],
  templateUrl: './service-list.html',
  styleUrl: './service-list.scss',
})
export class ServiceList {
  readonly list = input.required<ServiceEntity[]>()
  readonly actions = input<boolean>(false)
  selected = output<ServiceEntity>()
  edit = output<ServiceEntity>()
  delete = output<ServiceEntity>()

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

  protected handleMenuOption(value: string,service: ServiceEntity) {
    switch(value){
      case'edit':
        this.edit.emit(service);
        break;
      case 'delete':
        this.delete.emit(service);
        break;
    }
  }
}
