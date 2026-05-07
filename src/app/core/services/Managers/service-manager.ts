import {inject, Injectable} from '@angular/core';
import {GetServicesHttp} from '../ServiceHttp/get-services-http';
import {GetServiceHttp} from '../ServiceHttp/get-service-http';
import {CreateServiceHttp} from '../ServiceHttp/create-service-http';

@Injectable({
  providedIn: 'root',
})
export class ServiceManager {
  getList = inject(GetServicesHttp);
  getOne = inject(GetServiceHttp);
  create = inject(CreateServiceHttp);


}
