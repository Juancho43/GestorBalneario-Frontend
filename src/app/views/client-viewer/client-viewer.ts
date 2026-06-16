import {Component, computed, effect, inject, input, signal} from '@angular/core';
import {ClientManager} from '../../core/services/Managers/client-manager.service';
import {ClientEntity} from '../../core/model/clientEntity';
import {ClientDetails} from '../../components/clients/client-details/client-details';
import {ClientListManagerComponent} from '../../components/clients/client-list-manager/client-list-manager.component';
import {DeleteConfirmation} from '../../components/layout/delete-confirmation/delete-confirmation';
import {IDeleteDialogData} from '../../core/Interfaces/DeleteDialogData';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {MatIcon} from '@angular/material/icon';
import {DialogHelper} from '../../core/utils/other/dialog-helper';
import {EditClientDialog} from '../../components/clients/edit-client-dialog/edit-client-dialog';
import {NewClientDialog} from '../../components/clients/new-client-dialog/new-client-dialog';

@Component({
  selector: 'app-client-viewer',
  imports: [
    ClientListManagerComponent,
    ClientDetails,
    MatIcon,
  ],
  templateUrl: './client-viewer.html',
  styleUrl: './client-viewer.scss',
})
export class ClientViewer {
  private manager = inject(ClientManager);
  readonly id = input<string>();
  protected currentClient = computed(()=>this.manager.currentClientDetails());

  protected singlePane = signal(false);
  protected currentPane = signal('list');
  protected showList = computed(()=> this.singlePane() || this.currentPane() === 'list');
  protected showDetails = computed(()=> this.singlePane() || this.currentPane() === 'detail');

  constructor(){
    (new BreakpointObserver()).observe([Breakpoints.XSmall,Breakpoints.Small]).subscribe(result => {
      this.singlePane.set(!result.matches);
    })
    effect(() => {
      if(this.id() !== undefined){
        this.handleSelectClient(this.id()!);
      }
    })
  }

  private dialog = inject(DialogHelper);

  protected handleSelectClient(client:string) {
    this.currentPane.set('detail');
    this.setCurrentClient(client);
  }
  protected setCurrentClient(client: string) {
    this.manager.selectedClientId.set(client);
  }

  protected editClient($event: ClientEntity){

    this.setCurrentClient($event.id!);
    const ref = this.dialog.openDialog(EditClientDialog,this.dialog.getConfig());

  }
  protected deleteClient($event: ClientEntity) {
    this.setCurrentClient($event.id!);
    const data :IDeleteDialogData = {
      message: `Seguro que desea eliminar al siguinte cliente: ${$event.name}?`,
      title: 'Confirmación',
      cancelText: 'Cancelar',
      confirmText: 'Eliminar'
    }
    const ref = this.dialog.openDialog(DeleteConfirmation,{
      ...this.dialog.getConfig(),
      disableClose: true,
      data: data
    });
    ref.beforeClosed().subscribe(res =>{
      if(res) {
        this.manager.deleteClient($event)
      }
    })
  }

  protected handleFABButton() {
      const ref = this.dialog.openDialog(NewClientDialog,this.dialog.getConfig());
    }
  }

