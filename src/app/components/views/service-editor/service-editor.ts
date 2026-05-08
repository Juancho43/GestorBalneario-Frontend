import {Component, inject, linkedSignal, ViewChild} from '@angular/core';
import {ServiceManager} from '../../../core/services/Managers/service-manager';
import {ServiceForm} from '../../services/service-form/service-form';
import {ServiceEntity} from '../../../core/model/serviceEntity';
import {ServiceCard} from '../../services/service-card/service-card';
import {MatDialog} from '@angular/material/dialog';
import {IDeleteDialogData} from '../../../core/DTO/DeleteDialogData';
import {DeleteConfirmation} from '../../layout/delete-confirmation/delete-confirmation';

@Component({
  selector: 'app-service-editor',
  imports: [
    ServiceForm,
    ServiceCard
  ],
  templateUrl: './service-editor.html',
  styleUrl: './service-editor.scss',
})
export class ServiceEditor {
  private manager = inject(ServiceManager);
  private dialog = inject(MatDialog);

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
