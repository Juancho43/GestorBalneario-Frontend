import {Component, computed, inject, signal} from '@angular/core';
import {ClientForm} from '../client-form/client-form';
import {ClientEntity} from '../../../core/model/clientEntity';
import {ClientManager} from '../../../core/services/Managers/client-manager.service';
import {DialogRef} from '@angular/cdk/dialog';
import {ClientListManagerComponent} from '../client-list-manager/client-list-manager.component';

@Component({
  selector: 'app-client-searcher-dialog',
  imports: [
    ClientForm,
    ClientListManagerComponent
  ],
  templateUrl: './client-manager-dialog.component.html',
  styleUrl: './client-manager-dialog.component.scss',
})
export class ClientManagerDialog {
  private searched = signal(false);
  private manager = inject(ClientManager);

  list = computed(()=>this.manager.clientsToDisplay())
  private ref = inject(DialogRef<ClientManagerDialog>);
  readonly mode = signal<'search'|'create'>('search')

  protected createClient($event: ClientEntity) {

    this.manager.addClient($event);
    this.closeDialog();
  }
  protected selectClient($event: ClientEntity) {
    this.manager.currentClient.set($event);
    this.closeDialog();
  }
  private closeDialog() {
    this.ref.close();
  }

}
