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
}
