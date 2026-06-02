import {Component, computed, inject} from '@angular/core';
import {rxResource} from '@angular/core/rxjs-interop';
import {SeasonClientsDebtHttp} from '../../../core/services/season-clients-debt-http';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-clients-total-debt',
  imports: [
    CurrencyPipe
  ],
  templateUrl: './clients-total-debt.html',
  styleUrl: './clients-total-debt.scss',
})
export class ClientsTotalDebt {
  private totalDebtHttp = inject(SeasonClientsDebtHttp);
  debtResource = rxResource({
    stream: () => this.totalDebtHttp.execute()
  });
  debt = computed(()=>
    this.debtResource.isLoading() || this.debtResource.error() ? 0 : this.debtResource.value()!.data!
  )
}
