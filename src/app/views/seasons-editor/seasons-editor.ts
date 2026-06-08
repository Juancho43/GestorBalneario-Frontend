import {Component, computed, inject, signal, ViewChild} from '@angular/core';
import {SeasonForm} from '../../components/seasons/season-form/season-form';
import {SeasonEntity} from '../../core/model/SeasonEntity';
import {FormsModule} from '@angular/forms';
import {SeasonManager} from '../../core/services/Managers/season-manager';
import {MatDialog} from '@angular/material/dialog';
import {IDeleteDialogData} from '../../core/Interfaces/DeleteDialogData';
import {DeleteConfirmation} from '../../components/layout/delete-confirmation/delete-confirmation';
import {FABButton} from '../../components/layout/fab-button/fab-button';
import {OverlayHelper} from '../../core/utils/overlay-helper';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {SeasonListManager} from '../../components/seasons/season-list-manager/season-list-manager';
import {MatIcon} from '@angular/material/icon';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-seasons-editor',
  imports: [
    FormsModule,
    FABButton,
    SeasonListManager,
    MatIcon,
    JsonPipe
  ],
  templateUrl: './seasons-editor.html',
  styleUrl: './seasons-editor.scss',
})
export class SeasonsEditor {
  private manager = inject(SeasonManager);
  private dialog = inject(MatDialog);
  currentSeason = computed(()=>this.manager.currentSeason());
  @ViewChild('seasonForm') form!: SeasonForm;
  isOverlayOpen = false;
  private overlayHelper = inject(OverlayHelper);
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

  protected singlePane = signal(false);
  protected currentPane = signal('list');

  protected showList = computed(()=> this.singlePane() || this.currentPane() === 'list');
  protected showDetails = computed(()=> this.singlePane() || this.currentPane() === 'detail');
  constructor(){
    (new BreakpointObserver()).observe([Breakpoints.XSmall,Breakpoints.Small]).subscribe(result => {
      this.singlePane.set(!result.matches);
    })
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

  protected handleFABButton() {
    if (!this.isOverlayOpen){
      this.isOverlayOpen = true;
      const config = this.overlayHelper.getModalConfig();
      const overlayRef = this.overlayHelper.open(SeasonForm, config);
      overlayRef.backdropClick().subscribe(() => {
        overlayRef!.dispose();
        this.isOverlayOpen = false
      });
    }
  }
}
