import {Component, inject, input, linkedSignal, output} from '@angular/core';
import {form, FormField, required} from '@angular/forms/signals';
import {ShadowEntity} from '../../../core/model/shadowEntity';
import {ShadowListManager} from '../../../core/services/shadow-list-manager';

@Component({
  selector: 'app-shadow-form',
  imports: [
    FormField
  ],
  templateUrl: './shadow-form.component.html',
  styleUrl: './shadow-form.component.scss',
})
export class ShadowForm {
  private manager = inject(ShadowListManager);
  readonly shadowToEdit = input<ShadowEntity>({coords: {x: 0, y: 0}, identifier: '', name: '', type: ''});
  readonly state = input<'create' | 'edit'>('create');
  shadow = linkedSignal(this.shadowToEdit);
  finalShadow = output<{state:string,shadow:ShadowEntity}>();
  shadowForm = form(this.shadow, (schemaPath) => {
    required(schemaPath.identifier); // Add validation
  });
  submitted(event: SubmitEvent){
    event.preventDefault();
    if(this.manager.getByIdentifier(this.shadow().identifier)) return;
    console.log('Form submitted with values:', this.shadow());
    this.finalShadow.emit({state:this.state(),shadow:this.shadow()})
  }

}
