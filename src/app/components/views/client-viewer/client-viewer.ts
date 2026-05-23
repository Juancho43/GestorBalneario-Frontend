import {Component, inject, ViewChild} from '@angular/core';
import {ClientManager} from '../../../core/services/Managers/client-manager.service';
import {ClientEntity} from '../../../core/model/clientEntity';
import {ClientDetails} from '../../clients/client-details/client-details';
import {ClientListManagerComponent} from '../../clients/client-list-manager/client-list-manager.component';
import {ClientForm} from '../../clients/client-form/client-form';
import {DeleteConfirmation} from '../../layout/delete-confirmation/delete-confirmation';
import {MatDialog} from '@angular/material/dialog';
import {IDeleteDialogData} from '../../../core/DTO/DeleteDialogData';
import {Dialog} from '@angular/cdk/dialog';
import {SeasonForm} from '../../seasons/season-form/season-form';

@Component({
  selector: 'app-client-viewer',
  imports: [
    ClientListManagerComponent,
    ClientForm,
    SeasonForm
  ],
  templateUrl: './client-viewer.html',
  styleUrl: './client-viewer.scss',
})
export class ClientViewer {
  private manager = inject(ClientManager);
  private dialog = inject(Dialog);
  private matDialog = inject(MatDialog);
  @ViewChild('clientForm') form!: ClientForm;
  protected currentClient = this.manager.currentClient

  protected openClientDetail(client: ClientEntity) {
    this.setCurrentClient(client);
    this.dialog.open(ClientDetails);
  }
  protected setCurrentClient(client: ClientEntity) {
    this.manager.currentClient.set(client);
  }

  protected deleteClient($event: ClientEntity) {
    this.setCurrentClient($event);
    const data :IDeleteDialogData = {
      message: `Seguro que desea eliminar al siguinte cliente: ${$event.name}?`,
      title: 'Confirmación',
      cancelText: 'Cancelar',
      confirmText: 'Eliminar'
    }
    const ref = this.matDialog.open(DeleteConfirmation,{
      disableClose: true,
      data: data
    });
    ref.beforeClosed().subscribe(res =>{
      if(res) {
        this.manager.deleteClient($event)
      }
    })
  }

  protected handleSubmit($event: ClientEntity) {
    if (this.form.editMode()){
      this.manager.updateClient($event);
    }else{
      this.manager.addClient($event);
    }
  }
}
