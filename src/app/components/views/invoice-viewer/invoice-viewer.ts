import {Component, computed, inject, linkedSignal} from '@angular/core';
import {InvoiceManager} from '../../../core/services/Managers/invoice-manager.service';
import {InvoiceCard} from '../../invoices/invoice-card/invoice-card';
import {PaymentEntity} from '../../../core/model/paymentEntity';
import {InvoiceDetails} from '../../invoices/invoice-details/invoice-details';
import {InvoiceEntity} from '../../../core/model/InvoiceEntity';
import {Dialog} from '@angular/cdk/dialog';
import {ServiceListManager} from '../../services/service-list-manager/service-list-manager';
import {InvoiceListManager} from '../../invoices/invoice-list-manager/invoice-list-manager';

@Component({
  selector: 'app-invoice-viewer',
  imports: [
    InvoiceCard,
    ServiceListManager,
    InvoiceListManager
  ],
  templateUrl: './invoice-viewer.html',
  styleUrl: './invoice-viewer.scss',
})
export class InvoiceViewer {

}
