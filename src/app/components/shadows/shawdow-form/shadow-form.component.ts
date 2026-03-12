import {Component, inject, input, linkedSignal, output} from '@angular/core';
import {form, FormField, required} from '@angular/forms/signals';
import {ShadowEntity} from '../../../core/model/shadowEntity';
import {ShadowListManager} from '../../../core/services/shadow-list-manager';
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
  submitted(event: SubmitEvent){
    event.preventDefault();
    if(this.manager.getByIdentifier(this.shadow().identifier)) return;
    this.finalShadow.emit(this.shadow())
  }

}
