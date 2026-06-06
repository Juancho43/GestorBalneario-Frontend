import {Component, computed, inject, signal} from '@angular/core';
import {InvoiceListManager} from '../../components/invoices/invoice-list-manager/invoice-list-manager';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {MatIcon} from '@angular/material/icon';
import {InvoiceDetailsDTO} from '../../core/Interfaces/Details/InvoiceDetailDTO';
import {InvoiceManager} from '../../core/services/Managers/invoice-manager.service';
import {InvoiceEntity} from '../../core/model/InvoiceEntity';
import {InvoiceDetails} from '../../components/invoices/invoice-details/invoice-details';

@Component({
  selector: 'app-invoice-viewer',
  imports: [
    InvoiceListManager,
    MatIcon,
    InvoiceDetails
  ],
  templateUrl: './invoice-viewer.html',
  styleUrl: './invoice-viewer.scss',
})
export class InvoiceViewer {
  private manager = inject(InvoiceManager);
  protected currentInvoice = computed<InvoiceDetailsDTO | undefined>(()=>this.manager.currentInvoiceDetails())
  protected singlePane = signal(false);
  protected currentPane = signal('list');
  protected showList = computed(()=> this.singlePane() || this.currentPane() === 'list');
  protected showDetails = computed(()=> this.singlePane() || this.currentPane() === 'detail');
  constructor(){
    (new BreakpointObserver()).observe([Breakpoints.XSmall,Breakpoints.Small]).subscribe(result => {
      this.singlePane.set(!result.matches);
    })
  }


  protected handleSelectedInvoice($event: InvoiceEntity) {
    this.manager.selectedInvoiceId.set($event.id!);
    this.currentPane.set('detail');
  }
}
