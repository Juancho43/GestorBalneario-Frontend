import {Component, computed, inject, input, output, signal} from '@angular/core';
import {serviceSearch, ServiceSearcher} from '../service-searcher/service-searcher';
import {Paginator} from '../../paginator/paginator';
import {ServiceCard} from '../service-card/service-card';
import {ServiceManager} from '../../../core/services/Managers/service-manager';
import {ServiceEntity} from '../../../core/model/serviceEntity';

@Component({
  selector: 'app-service-list-manager',
  imports: [
    ServiceSearcher,
    Paginator,
    ServiceCard
  ],
  templateUrl: './service-list-manager.html',
  styleUrl: './service-list-manager.scss',
})
export class ServiceListManager {
  private manager = inject(ServiceManager);
  services =computed(() => this.manager.getList())
  serviceTypes = computed(() => this.manager.getTypes())
  search = signal(null);
  edit = output<ServiceEntity>()
  delete = output<ServiceEntity>()

  protected handleSearch($event: serviceSearch) {
    this.manager.currentType.set($event.type)
  }
}
