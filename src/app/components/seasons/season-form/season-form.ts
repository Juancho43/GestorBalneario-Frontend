import {Component, computed, input, linkedSignal, output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {form, FormField, required, validate} from '@angular/forms/signals';
import {SeasonEntity} from '../../../core/model/SeasonEntity';
import {minDateValidator} from '../../../core/utils/validator/dateValidator';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatFormField, MatInput, MatInputModule, MatLabel} from '@angular/material/input';
import {MatDatepickerModule,} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {DateInputPicker} from '../../layout/date-input-picker/date-input-picker';

@Component({
  selector: 'app-season-form',
  imports: [
    FormsModule,
    FormField,
    MatCheckbox,
    MatFormField,
    MatLabel,
    MatInput,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DateInputPicker
  ],
  templateUrl: './season-form.html',
  styleUrl: './season-form.scss',
})
export class SeasonForm {
  seasonToEdit = input<SeasonEntity>();
  editMode=linkedSignal(()=> !!this.seasonToEdit());
  startDate = linkedSignal(()=>new Date(new Date().setHours(0, 0, 0, 0)))
  endDate = linkedSignal(()=>new Date(new Date().setHours(23, 59, 59, 999)))
  season = linkedSignal(()=> this.seasonToEdit() ?? {
    id:'',
    name:'',
    startDate: this.startDate().toISOString().split('T')[0],
    endDate:this.endDate().toISOString().split('T')[0],
  } as SeasonEntity);
  cloneSeason = false;
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
      this.editMode.set(false);
    }
  }

  protected handleEndDate($event: string) {
   this.endDate.set(new Date($event));
  }

  protected handleStartDate($event: string) {
    this.startDate.set(new Date($event));
  }
}
