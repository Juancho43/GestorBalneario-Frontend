import {Component, computed, effect, inject, input, linkedSignal, OnDestroy, output, signal} from '@angular/core';
import {ServiceManager} from '../../../core/services/Managers/service-manager';
import {FormsModule} from '@angular/forms';
import {ServiceTypePipe} from '../../../core/utils/pipes/service-type-pipe';
import {form, FormField} from '@angular/forms/signals';
import {InvoiceItem} from '../../../core/model/invoiceItemEntity';

@Component({
  selector: 'app-invoice-adjustment-form',
  imports: [
    FormsModule,
    ServiceTypePipe,
    FormField,
  ],
  templateUrl: './invoice-item-form.component.html',
  styleUrl: './invoice-item-form.component.scss',
})
export class InvoiceItemForm implements OnDestroy {
  private serviceManager = inject(ServiceManager);
  readonly itemToEdit = input<InvoiceItem>()
  services = computed(()=>this.serviceManager.getList());
  types = ['DISCOUNT','RECHARGE']


  editMode = linkedSignal(() => !!this.itemToEdit());
  currentType = signal<string>(this.types[0])
  invoiceItem = linkedSignal<InvoiceItem>(()=> {
    if(this.itemToEdit()){
      return this.itemToEdit()!
    }
    return{
      id: '',
      aggregate: '',
      aggregateObject: undefined,
      serviceId:'',
      description:'',
      price: 1,
      quantity:1
    }
  });
  finalInvoiceItem = output<InvoiceItem>()
  invoiceItemForm = form(this.invoiceItem)
  constructor() {
    effect(() => {
      if(this.itemToEdit()){
        this.onTypeChange(this.itemToEdit()?.type!);
      }
    });
    this.onTypeChange(this.currentType());
  }

  protected onTypeChange(event: string) {
    this.currentType.set(event);
    this.invoiceItem.update(prev =>  {return {...prev,aggregate:event}});
    this.serviceManager.currentType.set(event);
  }
  ngOnDestroy(): void {
    this.onTypeChange('ALL')
  }

  protected handleSubmit() {
    this.finalInvoiceItem.emit(this.invoiceItem());
    this.editMode.set(false);
  }

  protected onServiceChange(value: string) {
    const name = (this.services()!.find(s => s.id === value))!.name;
    this.invoiceItem.update(prev => ({...prev, description: name}));
  }
}

