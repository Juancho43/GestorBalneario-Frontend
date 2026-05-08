import {Component, computed, inject,signal, ViewChild} from '@angular/core';
import {SeasonForm} from '../../seasons/season-form/season-form';
import {SeasonEntity} from '../../../core/model/SeasonEntity';
import {FormsModule} from '@angular/forms';
import {SeasonManager} from '../../../core/services/Managers/season-manager';
import {SeasonList} from '../../seasons/season-list/season-list';
import {MatDialog} from '@angular/material/dialog';
import {IDeleteDialogData} from '../../../core/DTO/DeleteDialogData';
import {DeleteConfirmation} from '../../layout/delete-confirmation/delete-confirmation';

@Component({
  selector: 'app-seasons-editor',
  imports: [
    SeasonForm,
    FormsModule,
    SeasonList
  ],
  templateUrl: './seasons-editor.html',
  styleUrl: './seasons-editor.scss',
})
export class SeasonsEditor {
  private manager = inject(SeasonManager);
  private dialog = inject(MatDialog);
  @ViewChild('seasonForm') form!: SeasonForm;
  seasonList =  computed(()=>this.manager.getList());
  seletedSeason = signal<SeasonEntity | undefined>(undefined);
  formattedSeason = computed(() => {
    const s = this.seletedSeason();

    if (!s) return undefined;

    return {
      ...s,
      startDate: new Date(s.startDate).toISOString().split('T')[0],
      endDate: new Date(s.endDate).toISOString().split('T')[0]
    } ;
  });
  constructor() {

  }
  protected handleSubmit($event: SeasonEntity){
    if (this.form.editMode()){
      this.manager.updateSeason($event);
    }else{
      if (this.form.cloneSeason) {
        this.manager.cloneSeason($event);
      }else{
        this.manager.createSeason($event);
      }
    }
  }

  protected handleDelete($event: SeasonEntity) {
    this.seletedSeason.set($event);
    const data :IDeleteDialogData = {
      message: `Seguro que desea eliminar la siguinte temporada: ${$event.name}?`,
      title: 'Confirmación',
      cancelText: 'Cancelar',
      confirmText: 'Eliminar'
    }
    const ref = this.dialog.open(DeleteConfirmation,{
      disableClose: true,
      data: data
    });
    ref.beforeClosed().subscribe(res =>{
      if(res) {
        this.manager.deleteSeason($event)
      }
    })
  }

  protected handleEdit($event: SeasonEntity) {
   this.seletedSeason.set($event)
  }
}
