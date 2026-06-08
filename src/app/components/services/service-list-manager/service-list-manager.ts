import {Component, computed, inject, output} from '@angular/core';
import {ServiceSearcher} from '../service-searcher/service-searcher';
import {ServiceManager} from '../../../core/services/Managers/service-manager';
import {ServiceEntity} from '../../../core/model/serviceEntity';
import {ServiceList} from '../service-list/service-list';
import {SearchBarData} from '../../../core/Interfaces/SearchInterfaces';
import {Paginator} from '../../layout/paginator/paginator';

@Component({
  selector: 'app-service-list-manager',
  imports: [
    ServiceSearcher,
    ServiceList,
    Paginator,
  ],
  templateUrl: './service-list-manager.html',
  styleUrl: './service-list-manager.scss',
})
export class ServiceListManager {
  private manager = inject(ServiceManager);
  services = computed(() => this.manager.servicesToDisplay())
  edit = output<ServiceEntity>()
  delete = output<ServiceEntity>()
  selectedService = output<ServiceEntity>()
  protected query = computed(()=>this.manager.searchQuery().pagination)
  protected handleSearch($event: SearchBarData) {
    this.manager.searchQuery.update((p) => ({
      ...p,
      search: $event
    }))
  }

  protected handlePage($event: number) {
    this.manager.searchQuery.update((p) => ({
      ...p,
      pagination: {
        page: $event,
        limit: 10
      }
    }))

  }

  protected selectService($event: ServiceEntity) {
    this.selectedService.emit($event);
  }
  protected deleteService($event: ServiceEntity) {
    this.delete.emit($event);
  }
  protected editService($event: ServiceEntity) {
    this.edit.emit($event);
  }
}
