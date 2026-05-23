import {Component, computed, inject, linkedSignal, ViewChild} from '@angular/core';
import {ServiceManager} from '../../../core/services/Managers/service-manager';
import {ServiceForm} from '../../services/service-form/service-form';
import {ServiceEntity} from '../../../core/model/serviceEntity';
import {MatDialog} from '@angular/material/dialog';
import {IDeleteDialogData} from '../../../core/DTO/DeleteDialogData';
import {DeleteConfirmation} from '../../layout/delete-confirmation/delete-confirmation';
import {ServiceListManager} from '../../services/service-list-manager/service-list-manager';
import {ClientListManagerComponent} from '../../clients/client-list-manager/client-list-manager.component';
import {FABButton} from '../../layout/fab-button/fab-button';

@Component({
  selector: 'app-service-editor',
  imports: [
    ServiceForm,
    ServiceListManager,
    ClientListManagerComponent,
    FABButton
  ],
  templateUrl: './service-editor.html',
  styleUrl: './service-editor.scss',
})
export class ServiceEditor {
  private manager = inject(ServiceManager);
  private dialog = inject(MatDialog);
  protected types = computed(()=>this.manager.getTypes())
  @ViewChild('serviceForm') form!: ServiceForm;
  services =  linkedSignal(()=> this.manager.getList());
  currentService = this.manager.currentService
   protected editHandler($event: ServiceEntity) {
   this.manager.currentService.set($event);
  }
  protected deleteHandler($event: ServiceEntity) {
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

  protected handleFormSubmit($event: ServiceEntity) {
   if(this.form.editMode()){
     this.manager.editService($event);
   }else{
     this.manager.createService($event);
   }
  }
}
