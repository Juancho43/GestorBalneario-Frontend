import {computed, inject, Injectable, linkedSignal, signal} from '@angular/core';
import {GetServicesHttp} from '../ServiceHttp/get-services-http';
import {GetServiceHttp} from '../ServiceHttp/get-service-http';
import {CreateServiceHttp} from '../ServiceHttp/create-service-http';
import {rxResource} from '@angular/core/rxjs-interop';
import {ServiceEntity} from '../../model/serviceEntity';
import {EditServiceHttp} from '../ServiceHttp/edit-service-http';
import {DeleteServiceHttp} from '../ServiceHttp/delete-service-http';
import {GetServiceTypesHttp} from '../ServiceHttp/get-service-types-http';
import {SearchQuery} from '../../Interfaces/SearchInterfaces';
import {ServiceSearch} from '../ServiceHttp/service-search';
import {ServiceDetailsDTO} from '../../Interfaces/Details/ServiceDetailsDTO';
import {emptySearchQuery} from '../other/const';

@Injectable({
  providedIn: 'root',
})
export class ServiceManager {
  private getServicesHttp = inject(GetServicesHttp);
  private searchHttp = inject(ServiceSearch)
  private createHttp = inject(CreateServiceHttp);
  private getOne = inject(GetServiceHttp);
  private editHttp = inject(EditServiceHttp);
  private deleteHttp = inject(DeleteServiceHttp);
  private serviceTypeHttp = inject(GetServiceTypesHttp);
  private serviceTypesResource = rxResource({
    stream: () => this.serviceTypeHttp.execute()
  })

  searchQuery = signal<SearchQuery>(emptySearchQuery);
  searchResource = rxResource({
    params: () => this.searchQuery(),
    stream: ({params}) => this.searchHttp.execute(params)
  })
  currentType = signal('ALL');
  private serviceResource = rxResource({
    params : () => this.currentType(),
    stream : ({params}) => this.getServicesHttp.get(params)
  })

  servicesToDisplay = computed(()=>
  this.searchResource.isLoading() && this.searchResource.error() ? [] : this.searchResource.value()?.data!
  )
  private serviceTypes = computed(()=>
    this.serviceTypesResource.isLoading() && this.serviceTypesResource.error() ? [] : this.serviceTypesResource.value()?.data!
  )
  private services = computed(()=>
    this.serviceResource.isLoading() && this.serviceResource.error() ? [] : this.serviceResource.value()?.data!.services!
  )
  currentService = linkedSignal<ServiceEntity | null>(() => this.services()?.[0] ?? null);
  getList(){
    return this.services()
  }
  getTypes(){
    return this.serviceTypes();
  }
  selectedServiceId = signal<null | string>(null);
  currentServiceDetails = signal<ServiceDetailsDTO | undefined>(undefined)


  createService(service: ServiceEntity){
    this.createHttp.execute(service).subscribe(r=>
      this.searchResource.reload()
    );
  }
  editService(service: ServiceEntity){
    this.editHttp.execute(service).subscribe(r=>
      this.searchResource.reload()
    );
  }
  deleteService(service: ServiceEntity){
    this.deleteHttp.delete(service.id!).subscribe(r =>
    this.searchResource.reload()
    )
  }
}
