import {Component, computed, input, linkedSignal, output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {form, FormField, required, validate} from '@angular/forms/signals';
import {SeasonEntity} from '../../../core/model/SeasonEntity';
import {minDateValidator} from '../../../core/utils/validator/dateValidator';

@Component({
  selector: 'app-season-form',
  imports: [
    FormsModule,
    FormField
  ],
  templateUrl: './season-form.html',
  styleUrl: './season-form.scss',
})
export class SeasonForm {
  seasonToEdit = input<SeasonEntity>();
  season = linkedSignal(()=> this.seasonToEdit() ?? {
    id:'',
    name:'season...',
    startDate: new Date(new Date().setHours(0, 0, 0, 0)),
    endDate: new Date(new Date().setHours(23, 59, 59, 999))
  } as SeasonEntity);
  seasonForm = form(this.season,(s) =>{
    required(s.startDate,{message:'La fecha de inicio es requerida'})
    required(s.endDate,{message:'La fehca de cierre es requerida'})
    required(s.name,{message:'El nombre de la temporada es requerido'})
    validate(s.endDate,minDateValidator(s.startDate));
  })

  allFormErrors = computed(() => {
    const root = this.seasonForm().errors() || [];

    const startDate = this.seasonForm.startDate().errors() || [];
    const endDate = this.seasonForm.endDate().errors() || [];
    const name = this.seasonForm.name().errors() || [];

    return [...root, ...startDate, ...endDate, ...name];
  });
  finalSeason = output<SeasonEntity>()
  protected submitHandler() {
    if(!this.seasonForm().invalid()){
      this.finalSeason.emit(this.season());
    }
  }
}
