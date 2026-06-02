import {Component, computed, input} from '@angular/core';
import {CurrencyPipe, DatePipe} from "@angular/common";

@Component({
  selector: 'app-items-table',
    imports: [
        CurrencyPipe,
        DatePipe
    ],
  templateUrl: './items-table.html',
  styleUrl: './items-table.scss',
})
export class ItemsTable {
  readonly items = input<any[]>([]);
  protected total = computed(()=>{
    return this.items().reduce((acc, item) => acc + item.price, 0);
  })
}
