import {Component, computed, inject, signal} from '@angular/core';
import {ServiceManager} from '../../core/services/Managers/service-manager';
import {ServiceEntity} from '../../core/model/serviceEntity';
import {IDeleteDialogData} from '../../core/Interfaces/DeleteDialogData';
import {DeleteConfirmation} from '../../components/layout/delete-confirmation/delete-confirmation';
import {ServiceListManager} from '../../components/services/service-list-manager/service-list-manager';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {MatIcon} from '@angular/material/icon';
import {JsonPipe} from '@angular/common';
import {DialogHelper} from '../../core/utils/other/dialog-helper';
import {EditServiceDialog} from '../../components/services/edit-service-dialog/edit-service-dialog';
import {NewServiceDialog} from '../../components/services/new-service-dialog/new-service-dialog';

@Component({
  selector: 'app-service-editor',
  imports: [
    ServiceListManager,
    MatIcon,
    JsonPipe
  ],
  templateUrl: './service-editor.html',
  styleUrl: './service-editor.scss',
})
export class ServiceEditor {
  private manager = inject(ServiceManager);
  private dialog = inject(DialogHelper);
  protected types = computed(()=>this.manager.getTypes())
  currentService = computed(()=>this.manager.currentService())


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
    this.dialog.openDialog(NewServiceDialog,this.dialog.getConfig());
  }

  protected handleSelect(s: string) {
    // this.dialog.openDialog(EditServiceDialog,this.dialog.getConfig());
  }



  protected handleEdit($event: ServiceEntity) {
    this.dialog.openDialog(EditServiceDialog,this.dialog.getConfig());
  }

  protected handleDelete($event: ServiceEntity) {
    this.manager.currentService.set($event);
    const data :IDeleteDialogData = {
      message: `Seguro que desea eliminar al siguinte servicio: ${$event.name}?`,
      title: 'Confirmación',
      cancelText: 'Cancelar',
      confirmText: 'Eliminar'
    }
    const config =
      {
        ...this.dialog.getConfig(),
        disableClose: true,
        data: data
      }
    const ref = this.dialog.openDialog(DeleteConfirmation,config);
    ref.beforeClosed().subscribe(res =>{
      if(res) {
        this.manager.deleteService($event)
      }
    })
  }
}
