import {Component, computed, inject} from '@angular/core';
import {ServiceManager} from '../../../core/services/Managers/service-manager';

@Component({
  selector: 'app-invoice-adjustment-form',
  imports: [],
  templateUrl: './invoice-adjustment-form.html',
  styleUrl: './invoice-adjustment-form.scss',
})
export class InvoiceAdjustmentForm {
  private serviceManager = inject(ServiceManager);
  services = computed(()=>this.serviceManager.getList());
}
