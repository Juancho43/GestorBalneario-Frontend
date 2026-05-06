import {Component, computed, inject, input, linkedSignal, output} from '@angular/core';
import {form, FormField, required, validate} from '@angular/forms/signals';
import {ShadowEntity} from '../../../core/model/shadowEntity';
import {ShadowManager} from '../../../core/services/Managers/shadow-manager.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-shadow-form',
  imports: [
    FormField,
    FormsModule,
  ],
  templateUrl: './shadow-form.component.html',
  styleUrl: './shadow-form.component.scss',
})
export class ShadowForm {
  private manager = inject(ShadowManager);
  readonly shadowToEdit = input<ShadowEntity>({coords: {x: 0, y: 0}, state:'available', identifier: '', name: '', type: 'carpa'});
  shadow = linkedSignal(this.shadowToEdit);
  finalShadow = output<ShadowEntity>();
  shadowForm = form(this.shadow, (schemaPath) => {
    required(schemaPath.identifier,{message:'El identificador es requerido'});
    validate(schemaPath.identifier, ({value}) => {
      if(this.manager.getByIdentifier(value())){
        return {
          kind: 'logical',
          message:'Debe seleccionar un identificador unico'
        }
      }
      return null
    })
  });

  allFormErrors = computed(() => {
    const root = this.shadowForm().errors() || [];

    const price = this.shadowForm.identifier().errors() || [];

    return [...root, ...price];
  });
  submitted(){
    if(!this.shadowForm().invalid()){
      this.finalShadow.emit(this.shadow())
    }
  }
}
