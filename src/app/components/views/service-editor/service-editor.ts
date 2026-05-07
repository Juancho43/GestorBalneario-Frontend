import {Component, computed, inject} from '@angular/core';
import {ServiceManager} from '../../../core/services/Managers/service-manager';
import {rxResource} from '@angular/core/rxjs-interop';
import {JsonPipe} from '@angular/common';
import {ServiceForm} from '../../services/service-form/service-form';
import {ServiceEntity} from '../../../core/model/serviceEntity';
import {SeasonServicesDTO} from '../../../core/DTO/SeasonServicesDTO';

@Component({
  selector: 'app-service-editor',
  imports: [
    JsonPipe,
    ServiceForm
  ],
  templateUrl: './service-editor.html',
  styleUrl: './service-editor.scss',
})
export class ServiceEditor {
  private serviceManager = inject(ServiceManager);
  serviceResource = rxResource({
    stream : () => this.serviceManager.getList.get()
  })
  services = computed(() => {
    if(!this.serviceResource.error()) return this.serviceResource.value()!.data!
    return {services: []} as SeasonServicesDTO;
  })

  protected createService($event: ServiceEntity) {
   this.serviceManager.create.execute($event).subscribe();
   this.serviceResource.reload();
  }
}
