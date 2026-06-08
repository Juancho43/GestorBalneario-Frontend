import {Component, input, output} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {CustomMenu} from '../../layout/custom-menu/custom-menu';
import {InvoiceEntity} from '../../../core/model/InvoiceEntity';
import {InvoiceStatePipe} from '../../../core/utils/pipes/invoice-state-pipe';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-invoice-list',
  imports: [
    MatIcon,
    CustomMenu,
    InvoiceStatePipe,
    CurrencyPipe
  ],
  templateUrl: './invoice-list.html',
  styleUrl: './invoice-list.scss',
})
export class InvoiceList {
  readonly list = input.required<InvoiceEntity[]>()
  selected = output<InvoiceEntity>()
  edit = output<InvoiceEntity>()
  delete = output<InvoiceEntity>()
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

  protected handleMenuOption(value: string,invoice: InvoiceEntity) {
    switch(value){
      case'edit':
        this.edit.emit(invoice);
        break;
      case 'delete':
        this.delete.emit(invoice);
        break;
    }
  }
}
