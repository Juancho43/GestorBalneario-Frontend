import {Component, computed, inject} from '@angular/core';
import {InvoiceManager} from '../../../core/services/Managers/invoice-manager.service';
import {InvoiceEntity} from '../../../core/model/InvoiceEntity';

@Component({
  selector: 'app-payment-creator',
  imports: [],
  templateUrl: './payment-creator.html',
  styleUrl: './payment-creator.scss',
})
export class PaymentCreator {
  private invoiceManager = inject(InvoiceManager);
  protected invoices = computed(() => this.invoiceManager.getList());

  protected selectInvoice(invoice: InvoiceEntity) {

  }
}
