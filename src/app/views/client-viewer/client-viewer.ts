import {Component, computed, effect, inject, input, signal} from '@angular/core';
import {ClientManager} from '../../core/services/Managers/client-manager.service';
import {ClientEntity} from '../../core/model/clientEntity';
import {ClientDetails} from '../../components/clients/client-details/client-details';
import {ClientListManagerComponent} from '../../components/clients/client-list-manager/client-list-manager.component';
import {ClientForm} from '../../components/clients/client-form/client-form';
import {DeleteConfirmation} from '../../components/layout/delete-confirmation/delete-confirmation';
import {MatDialog} from '@angular/material/dialog';
import {IDeleteDialogData} from '../../core/Interfaces/DeleteDialogData';
import {FABButton} from '../../components/layout/fab-button/fab-button';
import {OverlayHelper} from '../../core/utils/overlay-helper';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {MatIcon} from '@angular/material/icon';
import {DialogHelper} from '../../core/utils/dialog-helper';

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

  private overlayHelper = inject(OverlayHelper);

  isOverlayOpen = false;
  private matDialog = inject(MatDialog);

  protected handleSelectClient(client:string) {
    this.currentPane.set('detail');
    this.setCurrentClient(client);
  }
  protected setCurrentClient(client: string) {
    this.manager.selectedClientId.set(client);
  }

  protected editClient($event: ClientEntity){

    this.setCurrentClient($event.id!);
    console.log("EDITING");
  }
  // TODO: Use dialogHelper instead of Overlay
  protected deleteClient($event: ClientEntity) {
    this.setCurrentClient($event.id!);
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
