import {inject, Injectable} from '@angular/core';
import {GetServicesHttp} from '../services/ServiceHttp/get-services-http';
import {GetServiceHttp} from '../services/ServiceHttp/get-service-http';
import {CreateServiceHttp} from '../services/ServiceHttp/create-service-http';

@Injectable({
  providedIn: 'root',
})
export class ServiceManager {
  getList = inject(GetServicesHttp);
  getOne = inject(GetServiceHttp);
  create = inject(CreateServiceHttp);


}
