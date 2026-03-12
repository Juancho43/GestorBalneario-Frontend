import {Component, input, linkedSignal, output} from '@angular/core';
import {ClientEntity} from '../../../core/model/clientEntity';
import {form, FormField, schema} from '@angular/forms/signals';
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
  client = linkedSignal(() => this.clientToEdit() || {name: '', email: '', phone:''} as ClientEntity);
  clientForm = form(this.client, (schemaPath)=>{

  })

  finalClient = output<ClientEntity>();


  protected submitted() {
    this.finalClient.emit(this.client());
  }
}
