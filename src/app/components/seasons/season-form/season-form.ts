import {Component, input, linkedSignal, output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {form, FormField} from '@angular/forms/signals';
import {SeasonEntity} from '../../../core/model/SeasonEntity';

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
  seasonForm = form(this.season)

  finalSeason = output<SeasonEntity>()
  protected submitHandler() {
    console.log(this.season());
    this.finalSeason.emit(this.season());
  }
}
