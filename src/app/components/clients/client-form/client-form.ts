import {Component, computed, input, linkedSignal, output} from '@angular/core';
import {ClientEntity} from '../../../core/model/clientEntity';
import {email, form, FormField, required, schema} from '@angular/forms/signals';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-client-form',
  imports: [
    FormField,
    FormsModule
  ],
  templateUrl: './client-form.html',
  styleUrl: './client-form.scss',
})
export class ClientForm {
  clientToEdit = input<ClientEntity>();
  editMode = linkedSignal(() => {
    if(!this.clientToEdit()) return false
    return true
  })
  client = linkedSignal(() => this.clientToEdit() || {name: '', email: '', phone:''} as ClientEntity);
  clientForm = form(this.client, (schemaPath)=>{
    required(schemaPath.name,{message: 'El nombre es requerido'})
    email(schemaPath.email, {message:'El email no es válido'})
  })
  allFormErrors = computed(() => {
    const root = this.clientForm().errors() || [];
    const name = this.clientForm.name().errors() || [];
    const email = this.clientForm.email().errors() || [];
    return [...root, ...name,...email];

  });
  finalClient = output<ClientEntity>();


  protected submitted() {
    if(!this.clientForm().invalid()){
      this.finalClient.emit(this.client());
    }
  }
}
