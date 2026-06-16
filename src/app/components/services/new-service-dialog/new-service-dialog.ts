import {Component, computed, inject} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {ServiceManager} from '../../../core/services/Managers/service-manager';
import {ServiceEntity} from '../../../core/model/serviceEntity';
import {ServiceForm} from '../service-form/service-form';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-new-service-dialog',
  imports: [ServiceForm, MatIcon],
  templateUrl: './new-service-dialog.html',
  styleUrl: './new-service-dialog.scss',
})
export class NewServiceDialog {
  private ref = inject(MatDialogRef);
  private manager = inject(ServiceManager);
  protected service = computed(()=>this.manager.currentServiceDetails()?.service)
  protected types = computed(()=>this.manager.getTypes());
  protected handleSubmit($event: ServiceEntity) {
    this.manager.createService($event);
    this.close();
  }

  protected close() {
    this.ref.close();
  }

}
