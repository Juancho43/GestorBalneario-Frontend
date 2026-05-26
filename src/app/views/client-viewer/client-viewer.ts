import {Component, computed, inject, signal, ViewChild} from '@angular/core';
import {ClientManager} from '../../core/services/Managers/client-manager.service';
import {ClientEntity} from '../../core/model/clientEntity';
import {ClientDetails} from '../../components/clients/client-details/client-details';
import {ClientListManagerComponent} from '../../components/clients/client-list-manager/client-list-manager.component';
import {ClientForm} from '../../components/clients/client-form/client-form';
import {DeleteConfirmation} from '../../components/layout/delete-confirmation/delete-confirmation';
import {MatDialog} from '@angular/material/dialog';
import {IDeleteDialogData} from '../../core/DTO/DeleteDialogData';
import {FABButton} from '../../components/layout/fab-button/fab-button';
import {OverlayHelper} from '../../core/utils/overlay-helper';
import {BreakpointObserver} from '@angular/cdk/layout';
import {MatIcon} from '@angular/material/icon';
@Component({
  selector: 'app-client-viewer',
  imports: [
    ClientListManagerComponent,
    ClientDetails,
    FABButton,
    MatIcon,
  ],
  templateUrl: './client-viewer.html',
  styleUrl: './client-viewer.scss',
})
export class ClientViewer {
  private manager = inject(ClientManager);
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
  private overlayHelper = inject(OverlayHelper);
  isOverlayOpen = false;
  private matDialog = inject(MatDialog);

  protected openClientDetail(client: ClientEntity) {
    this.currentPane.set('detail');
    this.setCurrentClient(client);
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
  constructor(){
    (new BreakpointObserver()).observe(['(max-width: 800px)']).subscribe(result => {
      if (result.matches) {
        this.singlePane.set(false);
      } else {
        this.singlePane.set(true);
      }
    })
  }



  protected handleFABButton() {
    if (!this.isOverlayOpen){
      this.isOverlayOpen = true;
      const config = this.overlayHelper.getModalConfig();
      const overlayRef = this.overlayHelper.open(ClientForm, config);
      overlayRef.backdropClick().subscribe(() => {
        overlayRef!.dispose();
        this.isOverlayOpen = false
      });
    }
  }
}
