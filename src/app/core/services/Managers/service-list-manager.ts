import {computed, inject, Injectable} from '@angular/core';
import {GetServicesHttp} from '../ServiceHttp/get-services-http';
import {rxResource} from '@angular/core/rxjs-interop';
import {SeasonServicesDTO} from '../../DTO/SeasonServicesDTO';

@Injectable({
  providedIn: 'root',
})
export class ServiceListManager {
  private getList = inject(GetServicesHttp);

  servicesResource = rxResource({
    stream:()=>  this.getList.get()
  });

  serviceList = computed(() =>{
    if(!this.servicesResource.isLoading() || !this.servicesResource.error()){
      return this.servicesResource.value()?.data!;
    }
    return {services:[]}as SeasonServicesDTO;
  })
}
