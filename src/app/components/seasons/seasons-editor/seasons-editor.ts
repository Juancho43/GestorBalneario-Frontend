import {Component, inject} from '@angular/core';
import {SeasonForm} from '../season-form/season-form';
import {CreateSeasonHttp} from '../../../core/services/SeasonHttp/create-season-http';
import {SeasonEntity} from '../../../core/model/SeasonEntity';

@Component({
  selector: 'app-seasons-editor',
  imports: [
    SeasonForm
  ],
  templateUrl: './seasons-editor.html',
  styleUrl: './seasons-editor.scss',
})
export class SeasonsEditor {
  private createHttp = inject(CreateSeasonHttp);
  protected create($event: SeasonEntity) {
    this.createHttp.execute($event).subscribe();
  }
}
