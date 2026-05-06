import {Component, computed, input, linkedSignal, output} from '@angular/core';
import {ServiceEntity} from '../../../core/model/serviceEntity';
import {form, FormField, min, required} from '@angular/forms/signals';
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
  serviceForm = form(this.service,s =>{
    required(s.name,{message: 'El nombre es requerido'});
    required(s.price,{message: 'El precio es requerido'});
    min(s.price,1,{message: 'El precio debe ser positivo'});
  });
 allFormErrors = computed(() => {
    const root = this.serviceForm().errors() || [];
    const name = this.serviceForm.name().errors() || [];
    const price = this.serviceForm.price().errors() || [];
    return [...root, ...name, ...price];
  })
  finalService = output<ServiceEntity>()
  protected onSubmit() {
    this.finalService.emit(this.service())
  }
}
