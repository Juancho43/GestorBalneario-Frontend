import {computed, inject, Injectable} from '@angular/core';
import {GetServicesHttp} from '../other/get-services-http';
import {rxResource} from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class ServiceListManager {
  private getList = inject(GetServicesHttp);

  servicesResource = rxResource({
    stream:()=>  this.getList.get()
  });

  serviceList = computed(() => this.servicesResource.isLoading() || this.servicesResource.error() ? [] : this.servicesResource.value()!)
}
