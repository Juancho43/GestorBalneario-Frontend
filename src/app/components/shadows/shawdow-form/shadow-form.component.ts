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
  readonly shadowToEdit = input<ShadowEntity>();
  editMode = linkedSignal(()=>{
    if(this.shadowToEdit()) return true
    return false;
  })
  shadow = linkedSignal(()=>this.shadowToEdit() || {coords: {x: 0, y: 0}, state:'available', identifier: '', name: '', type: 'carpa'} as ShadowEntity);
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
    const indentifier = this.shadowForm.identifier().errors() || [];
    return [...root, ...indentifier];
  });
  submitted(){
    if(!this.shadowForm().invalid()){
      this.finalShadow.emit(this.shadow())
    }
  }
}
