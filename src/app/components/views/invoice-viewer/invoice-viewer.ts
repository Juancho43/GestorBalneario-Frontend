import {Component, computed, signal} from '@angular/core';
import {InvoiceDetails} from '../../invoices/invoice-details/invoice-details';
import {InvoiceListManager} from '../../invoices/invoice-list-manager/invoice-list-manager';
import {BreakpointObserver} from '@angular/cdk/layout';

@Component({
  selector: 'app-invoice-viewer',
  imports: [
    InvoiceListManager,
    InvoiceDetails
  ],
  templateUrl: './invoice-viewer.html',
  styleUrl: './invoice-viewer.scss',
})
export class InvoiceViewer {
  singlePane = signal(false);
  currentPane = signal('list');
  showList = computed(()=>{
    if(this.singlePane()) return true;
    return this.currentPane() === 'list';

  })
  showDetails = computed(()=>{
    if(this.singlePane()) return true;
    return this.currentPane() === 'detail';
  })

  constructor(){
    (new BreakpointObserver()).observe(['(max-width: 800px)']).subscribe(result => {
      if (result.matches) {
        this.singlePane.set(false);
      } else {
        this.singlePane.set(true);
      }
    })
  }

}
