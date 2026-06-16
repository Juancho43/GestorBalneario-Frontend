import {Component, computed, effect, inject, input, signal} from '@angular/core';
import {InvoiceListManager} from '../../components/invoices/invoice-list-manager/invoice-list-manager';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {MatIcon} from '@angular/material/icon';
import {InvoiceDetailsDTO} from '../../core/Interfaces/Details/InvoiceDetailDTO';
import {InvoiceManager} from '../../core/services/Managers/invoice-manager.service';
import {InvoiceDetails} from '../../components/invoices/invoice-details/invoice-details';
import {InvoiceEntity} from '../../core/model/InvoiceEntity';
import {Router} from '@angular/router';
import {FABButton} from '../../components/layout/fab-button/fab-button';
import {DialogHelper} from '../../core/utils/other/dialog-helper';
import {NewPaymentSideSheet} from '../../components/payments/new-payment-dialog/new-payment-side-sheet.component';
import {SideSheet} from '../../components/layout/side-sheet/side-sheet';

@Component({
  selector: 'app-invoice-viewer',
  imports: [
    InvoiceListManager,
    MatIcon,
    InvoiceDetails,
    FABButton,
    SideSheet,
    NewPaymentSideSheet
  ],
  templateUrl: './invoice-viewer.html',
  styleUrl: './invoice-viewer.scss',
})
export class InvoiceViewer {
  private manager = inject(InvoiceManager);
  private router = inject(Router);
  readonly id = input<string>();
  protected currentInvoice = computed<InvoiceDetailsDTO | undefined>(()=>this.manager.currentInvoiceDetails())
  protected singlePane = signal(false);
  protected currentPane = signal('list');
  protected showList = computed(()=> this.singlePane() || this.currentPane() === 'list');
  protected showDetails = computed(()=> this.singlePane() || this.currentPane() === 'detail');
  protected paymentSideSheet = signal<boolean>(false);
  constructor(){
    (new BreakpointObserver()).observe([Breakpoints.XSmall,Breakpoints.Small]).subscribe(result => {
      this.singlePane.set(!result.matches);
    })

    effect(() => {
      if(this.id() !== undefined){
        this.handleSelectedInvoice(this.id()!);
      }
    })
  }

  protected handleSelectedInvoice($event: string) {
    this.manager.selectedInvoiceId.set($event);
    this.currentPane.set('detail');
  }

  protected editInvoice($event: InvoiceEntity) {
    const url = `invoice-editor/${$event.id}`;
    this.router.navigateByUrl(url);
  }

  protected deleteInvoice($event: InvoiceEntity) {
    console.log('DELETING')
  }


}
