import {Component, input} from '@angular/core';
import {ServiceDetailsDTO} from '../../../core/Interfaces/Details/ServiceDetailsDTO';
import {ServiceCard} from '../service-card/service-card';

@Component({
  selector: 'app-service-details',
  imports: [
    ServiceCard
  ],
  templateUrl: './service-details.html',
  styleUrl: './service-details.scss',
})
export class ServiceDetails {
  readonly serviceData = input<ServiceDetailsDTO | undefined>(undefined);
}
