import {Component, computed, inject,signal, ViewChild} from '@angular/core';
import {SeasonForm} from '../../components/seasons/season-form/season-form';
import {SeasonEntity} from '../../core/model/SeasonEntity';
import {FormsModule} from '@angular/forms';
import {SeasonManager} from '../../core/services/Managers/season-manager';
import {SeasonList} from '../../components/seasons/season-list/season-list';
import {MatDialog} from '@angular/material/dialog';
import {IDeleteDialogData} from '../../core/DTO/DeleteDialogData';
import {DeleteConfirmation} from '../../components/layout/delete-confirmation/delete-confirmation';
import {FABButton} from '../../components/layout/fab-button/fab-button';
import {OverlayHelper} from '../../core/utils/overlay-helper';
import {BreakpointObserver} from '@angular/cdk/layout';

@Component({
  selector: 'app-seasons-editor',
  imports: [
    FormsModule,
    SeasonList,
    FABButton
  ],
  templateUrl: './seasons-editor.html',
  styleUrl: './seasons-editor.scss',
})
export class SeasonsEditor {
  private manager = inject(SeasonManager);
  private dialog = inject(MatDialog);
  @ViewChild('seasonForm') form!: SeasonForm;
  isOverlayOpen = false;
  private overlayHelper = inject(OverlayHelper);
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

  singlePane = signal(false);
  currentPane = signal('list');
  showList = computed(()=>{
    if(this.singlePane()) return true;
    return this.currentPane() === 'list';

  })
  showDetails = computed(()=>{
    if(this.singlePane()) return true;
    return this.currentPane() === 'detail';
  })

  constructor(){
    (new BreakpointObserver()).observe(['(max-width: 800px)']).subscribe(result => {
      if (result.matches) {
        this.singlePane.set(false);
      } else {
        this.singlePane.set(true);
      }
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
