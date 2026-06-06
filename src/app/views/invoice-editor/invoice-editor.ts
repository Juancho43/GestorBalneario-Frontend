import {Component, inject, linkedSignal, signal, ViewChild} from '@angular/core';
import {InvoiceManager} from '../../core/services/Managers/invoice-manager.service';
import {InvoiceItemForm} from '../../components/invoices/invoice-adjustment-form/invoice-item-form.component';
import {InvoiceItemsManager} from '../../core/services/Managers/invoice-items-manager';
import {InvoiceItem} from '../../core/model/invoiceItemEntity';
import {InvoiceAdjustment} from '../../components/invoices/invoice-adjustment/invoice-adjustment';
import {DeleteInvoiceItemCommand} from '../../core/services/InvoiceHttp/remove-items-http.service';

@Component({
  selector: 'app-invoice-editor',
  imports: [
    InvoiceItemForm,
    InvoiceAdjustment
  ],
  templateUrl: './invoice-editor.html',
  styleUrl: './invoice-editor.scss',
})
export class InvoiceEditor {
  private itemManager = inject(InvoiceItemsManager);
  private manager = inject(InvoiceManager);
  invoice = linkedSignal(()=>this.manager.invoice())
  editingItems =linkedSignal<InvoiceItem[]>(() => this.itemManager.currentItems())
  currentItem = signal<InvoiceItem | undefined>(undefined);
  @ViewChild('editItemForm') editItemForm!: InvoiceItemForm;

  protected selectInvoice(invoice: any) {
    this.manager.selectedInvoiceId.set(invoice.id!);
  }

  protected handleSubmitEvent($event: InvoiceItem) {
    $event.invoiceId = this.invoice().invoice.id!;
    if(!this.editItemForm.editMode()){
      this.addNewInvoiceItem($event);
    }else{
      this.handleEditInvoiceItem($event);
    }
  }

  protected addNewInvoiceItem($event: InvoiceItem) {
    $event.clientId = this.invoice().client.id!
    $event.type = $event.aggregate;
    this.itemManager.addItem($event)
  }

  protected handleEditInvoiceItem($event: InvoiceItem) {
    this.currentItem.set(undefined);
    this.itemManager.updateItem($event);
  }

  protected handleDeleteInvoiceItem($event: InvoiceItem) {
    const command : DeleteInvoiceItemCommand= {
      invoiceId: this.invoice().invoice.id!,
      itemId: $event.id!
    };
    this.itemManager.deleteItem(command);
  }
}
