import {Component, inject, input, linkedSignal, output} from '@angular/core';
import {form, FormField, required} from '@angular/forms/signals';
import {ShadowEntity} from '../../../core/model/shadowEntity';
import {ShadowListManager} from '../../../core/services/Managers/shadow-list-manager';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-shadow-form',
  imports: [
    FormField,
    JsonPipe
  ],
  templateUrl: './shadow-form.component.html',
  styleUrl: './shadow-form.component.scss',
})
export class ShadowForm {
  private manager = inject(ShadowListManager);
  readonly shadowToEdit = input<ShadowEntity>({coords: {x: 0, y: 0}, state:'active', identifier: '', name: '', type: ''});
  shadow = linkedSignal(this.shadowToEdit);
  finalShadow = output<ShadowEntity>();
  shadowForm = form(this.shadow, (schemaPath) => {
    required(schemaPath.identifier); // Add validation

  });
  error = false;

  submitted(event: SubmitEvent){
    event.preventDefault();
    const result = this.manager.getByIdentifier(this.shadow().identifier);
    console.log('resultado:',result);
    if (result) {
      this.error = true;
    }else{
      this.finalShadow.emit(this.shadow())
    }
  }

}
