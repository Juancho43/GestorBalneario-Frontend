import {Component, computed, inject} from '@angular/core';
import {ServiceForm} from '../service-form/service-form';
import {MatIcon} from '@angular/material/icon';
import {MatDialogRef} from '@angular/material/dialog';
import {ServiceManager} from '../../../core/services/Managers/service-manager';
import {ServiceEntity} from '../../../core/model/serviceEntity';

@Component({
  selector: 'app-edit-service-dialog',
  imports: [ServiceForm,MatIcon],
  templateUrl: './edit-service-dialog.html',
  styleUrl: './edit-service-dialog.scss',
})
export class EditServiceDialog {

  private ref = inject(MatDialogRef);
  private manager = inject(ServiceManager);
  protected service = computed(()=>this.manager.currentServiceDetails()?.service)

  protected handleSubmit($event: ServiceEntity) {
    this.manager.editService($event);
    this.close();
  }

  protected close() {
    this.ref.close();
  }
}
