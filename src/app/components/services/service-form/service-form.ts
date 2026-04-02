import {Component, input, linkedSignal, output} from '@angular/core';
import {ServiceEntity} from '../../../core/model/serviceEntity';
import {form, FormField} from '@angular/forms/signals';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-service-form',
  imports: [
    FormField,
    FormsModule
  ],
  templateUrl: './service-form.html',
  styleUrl: './service-form.scss',
})
export class ServiceForm {
  serviceToEdit = input<ServiceEntity>();
  service = linkedSignal(()=> this.serviceToEdit() ?? {
    name:'',
    price:1,
  }as ServiceEntity);
  serviceForm = form(this.service);
  finalService = output<ServiceEntity>()
  protected onSubmit() {
    this.finalService.emit(this.service())
  }
}
