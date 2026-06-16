import {Component, computed, input, linkedSignal, output} from '@angular/core';
import {ServiceEntity} from '../../../core/model/serviceEntity';
import {form, FormField, min, required} from '@angular/forms/signals';
import {FormsModule} from '@angular/forms';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {SelectInput} from '../../layout/select-input/select-input';
import {ServiceTypePipe} from '../../../core/utils/pipes/service-type-pipe';

@Component({
  selector: 'app-service-form',
  imports: [
    FormField,
    FormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    SelectInput
  ],
  templateUrl: './service-form.html',
  styleUrl: './service-form.scss',
})
export class ServiceForm {
  readonly types = input<string[]>([]);
  serviceToEdit = input<ServiceEntity>();
  service = linkedSignal(()=> this.serviceToEdit() ?? {
    name:'',
    price:1,
    type:'OTHER'
  }as ServiceEntity);
  typePipe = new ServiceTypePipe();
  editMode = linkedSignal(()=>!!this.serviceToEdit());
  serviceForm = form(this.service,s =>{
    required(s.name,{message: 'El nombre es requerido'});
    required(s.price,{message: 'El precio es requerido'});
    // min(s.price,1,{message: 'El precio debe ser positivo'});
  });
 allFormErrors = computed(() => {
    const root = this.serviceForm().errors() || [];
    const name = this.serviceForm.name().errors() || [];
    const price = this.serviceForm.price().errors() || [];
    return [...root, ...name, ...price];
  })
  finalService = output<ServiceEntity>()
  protected onSubmit() {
   if(!this.serviceForm().invalid()){
     this.finalService.emit(this.service())
     this.editMode.set(false)
   }
  }

  protected handleTypeChange($event: string) {
    this.service.update(p => {
      return{
        ...p,
        type:$event
      }
    })
  }
}
