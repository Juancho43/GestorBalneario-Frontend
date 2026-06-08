import {Component, computed, inject, signal} from '@angular/core';
import {ServiceManager} from '../../core/services/Managers/service-manager';
import {ServiceForm} from '../../components/services/service-form/service-form';
import {ServiceEntity} from '../../core/model/serviceEntity';
import {MatDialog} from '@angular/material/dialog';
import {IDeleteDialogData} from '../../core/Interfaces/DeleteDialogData';
import {DeleteConfirmation} from '../../components/layout/delete-confirmation/delete-confirmation';
import {ServiceListManager} from '../../components/services/service-list-manager/service-list-manager';
import {FABButton} from '../../components/layout/fab-button/fab-button';
import {OverlayHelper} from '../../core/utils/overlay-helper';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {MatIcon} from '@angular/material/icon';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-service-editor',
  imports: [
    ServiceListManager,
    FABButton,
    MatIcon,
    JsonPipe
  ],
  templateUrl: './service-editor.html',
  styleUrl: './service-editor.scss',
})
export class ServiceEditor {
  private manager = inject(ServiceManager);
  private dialog = inject(MatDialog);
  private overlayHelper = inject(OverlayHelper);
  isOverlayOpen = false;
  protected types = computed(()=>this.manager.getTypes())
  currentService = computed(()=>this.manager.currentService())

  protected handleFormSubmit($event: ServiceEntity) {
   // if(this.form.editMode()){
   //   this.manager.editService($event);
   // }else{
   //   this.manager.createService($event);
   // }
  }

  protected singlePane = signal(false);

  protected currentPane = signal('list');
  protected showList = computed(()=> this.singlePane() || this.currentPane() === 'list');
  protected showDetails = computed(()=> this.singlePane() || this.currentPane() === 'detail');
  constructor(){
    (new BreakpointObserver()).observe([Breakpoints.XSmall,Breakpoints.Small]).subscribe(result => {
      this.singlePane.set(!result.matches);
    })
  }
  protected handleFABButton() {
    if (!this.isOverlayOpen){
      this.isOverlayOpen = true;
      const config = this.overlayHelper.getModalConfig();
      const overlayRef = this.overlayHelper.open(ServiceForm, config);
      overlayRef.backdropClick().subscribe(() => {
        overlayRef!.dispose();
        this.isOverlayOpen = false
      });
    }
  }

  protected handleSelect(s: string) {

    console.log("SELECT");
  }



  protected handleEdit($event: ServiceEntity) {

    console.log("EDITING");
  }

  protected handleDelete($event: ServiceEntity) {
    this.manager.currentService.set($event);
    const data :IDeleteDialogData = {
      message: `Seguro que desea eliminar al siguinte servicio: ${$event.name}?`,
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
        this.manager.deleteService($event)
      }
    })
  }
}
